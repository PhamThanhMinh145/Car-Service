import React, { useEffect, useState } from "react";
import "../../styles/button.scss";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  getGarages,
  resetState,
  updateGarageStatus,
} from "../../features/garage/garageSlice";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import Notification from "../../components/Notification";
import ModalAdd from "./ModalAdd";

const headCells = [
  { id: "garageId", label: "ID" },
  { id: "garageName", label: "Tên garage", disableSorting: true },
  { id: "garageContactInformation", label: "SĐT" },

  { id: "garageStatus", label: "Trạng thái" },
  { id: "totalServices", label: "Tổng số dịch vụ", align:"center" },
  // { id: "", label: "Total Product" },
  { id: "totalOrders", label: "Tổng đơn hàng", align:"center" },

  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Onwers = () => {
  useEffect(() => {
    document.title = "Danh sách Garage";
  }, []);

  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateSuccessAction = useSelector(
    (state) => state.garage.isSuccessAction
  );
  const gara = useSelector((state) => state.garage);
  const { isSuccessAdd, message } = gara;
  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getGarages(data));
    if (isSuccessAdd) {
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
      handleClose();
    } else {
      if (message.status === 400) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      } else if (message.status === 404) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      }
    }
    if (updateSuccessAction) {
      dispatch(resetState());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Thành công",
        type: "success",
      });
    }
  }, [isSuccessAdd, message, page, rowsPerPage, updateSuccessAction]);

  const recordsGarage = useSelector((state) => state.garage.garages);

  const handleSwitchToggle = (garageId, garageStatus) => {
    // Dispatch the updateCustomerStatus action
    // console.log("id and status", garageId, garageStatus);
    dispatch(updateGarageStatus({ garageId, garageStatus }));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsGarage,
      headCells,
      filterFn,
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      15
    );
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
          alt="onwers"
          title="Danh sách garage"
          number="15"
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                
                  <div className="d-flex justify-content-sm-end">
                    <Button
                      className="add-button"
                      size="large"
                      onClick={() => setShowModal(true)}
                      startIcon={<AddIcon fontSize="small" />}
                      text="Thêm mới garage"
                    />
                  </div>
                
              </div>

              {/* Table Onwer */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.garageId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.garageId}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex align-items-center gap-2 w-max-content">
                            <div>
                              <Link
                                to={`/admin/garage/view/${item.garageId}`}
                                className="title-color"
                              >
                                {item.garageName}
                              </Link>
                            </div>
                          </div>
                        </TableCell>
                        {/* Onwer name */}

                        <TableCell sx={{ border: "none" }}>
                          <Link
                            to={`tel:${item.garageContactInformation}`}
                            className="title-color hover-c1 lowercase "
                          >
                            {item.garageContactInformation}
                          </Link>
                        </TableCell>
                        {/* status garage */}
                        <TableCell sx={{ border: "none" }}>
                          <Switches
                            checked={
                              item.garageStatus === "Activate" ? true : false
                            }
                            onChange={(event) => {
                              setConfirmDialog({
                                isOpen: true,
                                title:
                                  "Bạn có chắc chắn muốn thay đổi trạng thái?",
                                subTitle: "Bạn không thể hoàn tác thao tác này",
                                onConfirm: () => {
                                  handleSwitchToggle(
                                    item.garageId,
                                    event.target.checked ? 1 : 0
                                  );
                                },
                              });
                            }}
                          />
                        </TableCell>
                        {/* Total Service */}
                        <TableCell
                          sx={{
                            border: "none", textAlign:"center", paddingRight:"40px"
                          }}
                        >
                          <Link
                            to={`/admin/garage/service-list/${item.garageId}`}
                            className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                          >
                            {item.totalServices}
                          </Link>
                        </TableCell>

                        {/* Total Order */}
                        <TableCell
                          sx={{
                            border: "none", textAlign:"center", paddingRight:"40px"
                          }}
                        >
                          <Link
                            to={`/admin/garage/order-list/${item.garageId}`}
                            className="btn text-info bg-soft-info font-weight-bold px-3 py-1 fz-12 mb-0"
                          >
                            {item.totalOrders}
                          </Link>
                        </TableCell>
                        {/* Action */}

                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="Chi tiết" arrow>
                              <Link
                                to={`/admin/garage/view/${item.garageId}`}
                                className="btn btn-outline-info btn-sm square-btn"
                              >
                                <VisibilityIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ModalAdd show={showModal} handleClose={handleClose} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Onwers;
