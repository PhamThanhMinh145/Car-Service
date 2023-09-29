import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  resetState,
  updateServiceStatus,
} from "../../features/service/serviceSlide";
import ModalAdd from "./ModalAdd";
import Notification from "../../components/Notification";
import ModalEdit from "./ModalEdit";
import authService from "../../features/auth/authService";

const headCells = [
  { id: "serviceId", label: "ID" },
  { id: "serviceImage", label: "Hình ảnh" },
  { id: "serviceName", label: "Tên dịch vụ" },
  { id: "serviceGroup", label: "Loại dịch vụ" },

  { id: "serviceUnit", label: "Số lần",align: "center", },
  { id: "serviceWarrantyPeriod", label: "Số tháng BH" ,align: "center",},
  { id: "serviceStatus", label: "Trạng thái" },

  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Services = () => {
  useEffect(() => {
    document.title = "Danh sách dịch vụ";
  }, []);
  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  // Edit
  const [showEdit, setShowEdit] = useState(false);
  const [serEdit, setSerEdit] = useState({});
  const handleEdit = (ser) => {
    setSerEdit(ser);
    setShowEdit(true);
  };
  const serState = useSelector((state) => state.service);
  const { isSuccessAdd, message } = serState;
  console.log(message);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Call API List
  const updateSuccessAction = useSelector(
    (state) => state.service.isSuccessAction
  );
  const getData = () => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getServices(data));
  };
  useEffect(() => {
    getData();
    if (isSuccessAdd) {
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
      handleClose();
    } else {
      if (message?.status === 400) {
        setNotify({
          isOpen: true,
          message: "Thất bại",
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
  }, [page, rowsPerPage, isSuccessAdd, message, updateSuccessAction]);

  const handleSwitchToggle = (serviceId) => {
    dispatch(updateServiceStatus(serviceId));
  };

  const recordsService = useSelector((state) => state.service.services);
  const count = useSelector((state) => state.service.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsService,
      headCells,
      filterFn,
      pages,
      page,
      rowsPerPage,
      setPage,
      setRowsPerPage,
      count
    );
  return (
    <>
      <div className="md:pt-24 md:px-8">
        <Header
          icon="https://i.imgur.com/1EPVEZN.png"
          size={25}
          alt=""
          title="Danh sách dịch vụ"
          number={count}
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                {role === "Admin" ? (
                  <div className="d-flex justify-content-sm-end">
                    <div>
                      <Button
                        className="add-button"
                        size="large"
                        onClick={() => setShowModal(true)}
                        startIcon={<AddIcon fontSize="small" />}
                        text="Thêm mới dịch vụ"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* Table */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.serviceId}>
                        {role === "Admin" ? (
                          <TableCell sx={{ border: "none" }}>
                            <Link
                              to={`/admin/list-service/detail/${item.serviceId}`}
                              className="title-color hover-c1"
                            >
                              <div>{item.serviceId}</div>
                            </Link>
                          </TableCell>
                        ) : (
                          <TableCell sx={{ border: "none" }}>
                            <Link
                              to={`/manager/list-service/detail/${item.serviceId}`}
                              className="title-color hover-c1"
                            >
                              <div>{item.serviceId}</div>
                            </Link>
                          </TableCell>
                        )}

                        <TableCell sx={{ border: "none", textAlign: "center" }}>
                          <img
                            className="rounded"
                            src={item.serviceImage}
                            width={70}
                            alt={"hello"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          {item.serviceName}
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.serviceGroup}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign: "center",paddingRight :"35px" }}>
                          <div>{item.serviceUnit}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none",textAlign: "center", paddingRight:"40px" }}>
                          <div>{item.serviceWarrantyPeriod}</div>
                        </TableCell>
                        {role === "Admin" ? (
                          <TableCell sx={{ border: "none" }}>
                            <Switches
                              checked={
                                item.serviceStatus === "Activate" ? true : false
                              }
                              onChange={(event) => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title:
                                    "Bạn có chắc chắn muốn thay đổi trạng thái?",
                                  subTitle:
                                    "Bạn không thể hoàn tác thao tác này",
                                  onConfirm: () => {
                                    handleSwitchToggle(item.serviceId);
                                  },
                                });
                              }}
                            />
                          </TableCell>
                        ) : (
                          <TableCell sx={{ border: "none" }}>
                            <span
                              className={
                                item.serviceStatus === "Activate"
                                  ? "badge badge-soft-success fz-12"
                                  : "badge badge-soft-danger fz-12"
                              }
                            >
                              {item.serviceStatus === "Activate" ? "Khả Dụng" : "Không Khả dụng"}
                            </span>
                          </TableCell>
                        )}

                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="Chi tiết" arrow>
                              {role === "Admin" ? (
                                <Link
                                  to={`/admin/list-service/detail/${item.serviceId}`}
                                  className="btn btn-outline-info btn-sm square-btn"
                                >
                                  <VisibilityIcon fontSize="small" />
                                </Link>
                              ) : (
                                <Link
                                  to={`/manager/list-service/detail/${item.serviceId}`}
                                  className="btn btn-outline-info btn-sm square-btn"
                                >
                                  <VisibilityIcon fontSize="small" />
                                </Link>
                              )}
                            </Tooltip>
                            {role === "Admin" ? (
                              <Tooltip title="Cập nhật" arrow>
                                <Link
                                  onClick={() => handleEdit(item)}
                                  className="btn btn-outline--primary btn-sm square-btn"
                                >
                                  <EditIcon fontSize="small" />
                                </Link>
                              </Tooltip>
                            ) : (
                              <></>
                            )}
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
      <ModalEdit show={showEdit} handleClose={handleClose} serEdit={serEdit} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Services;
