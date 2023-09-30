import "../../styles/button.scss";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";
import MoneyIcon from "@mui/icons-material/Money";
import Notification from "../../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import ModalAdd from "./AddMechanic";
import ModalEdit from "./ModalEdit";
import {
  getMechanics,
  resetState,
  updateMechanicStatus,
  getMechanicsByGarage,
} from "../../features/mechanic/mechanicSlice";
import useTableV2 from "../../components/table/useTableV2";
import authService from "../../features/auth/authService";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Tên thợ" },

  { id: "contact", label: "Thông tin liện hệ" },
  { id: "level", label: "Cấp bậc" },
  { id: "totalOrders", label: "Số lượng đơn", align: "center" },

  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const headCellsManager = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Tên thợ" },

  { id: "contact", label: "Thông tin liện hệ" },
  { id: "level", label: "Cấp bậc" },
  { id: "totalOrders", label: "Số lượng đơn", align: "center" },
  { id: "userStatus", label: "Trạng thái", align: "center" },
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];
const Mechanics = () => {
  useEffect(() => {
    document.title = "Danh sách thợ sửa xe";
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
  //Edit
  const [showEdit, setShowEdit] = useState(false);
  const [mechaEdit, setMechaEdit] = useState({});
  const handleEdit = (mecha) => {
    setMechaEdit(mecha);
    setShowEdit(true);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateSuccessAction = useSelector(
    (state) => state.mechanic.isSuccessAction
  );
  const mechanicState = useSelector((state) => state.mechanic);
  const { isSuccessAdd, message } = mechanicState;
  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };

    if (role === "Admin") dispatch(getMechanics(data));
    else if (role === "Manager")
      dispatch(getMechanicsByGarage({ ...data, garageId: user?.garageId }));

    if (isSuccessAdd) {
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
      handleClose();
    } else {
      if (message.status === 404) {
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
  }, [page, updateSuccessAction, rowsPerPage, isSuccessAdd, message]);

  const handleSwitchToggle = (userId, userStatus) => {
    dispatch(updateMechanicStatus({ userId, userStatus }));
  };
  const recordsMechanic = useSelector((state) => state.mechanic.mechanics);
  const count = useSelector((state) => state.mechanic.number);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsMechanic,
      role === "Admin" ? headCells : headCellsManager,
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
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://cdn-icons-png.flaticon.com/512/1995/1995470.png"
          size={20}
          alt="mechanics"
          title="Danh sách thợ sửa chữa"
          number={count}
        />

        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="px-3 py-4">
                {role === "Manager" ? (
                  <div className="d-flex justify-content-sm-end">
                    <Button
                      className="add-button"
                      size="large"
                      onClick={() => setShowModal(true)}
                      startIcon={<AddIcon fontSize="small" />}
                      text="Thêm thợ sửa chữa"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/* Table  */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.userId}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.userId}</div>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <div className="media align-items-center gap-2">
                            <div>
                              {role === "Admin" ? (
                                <Link
                                  to={`/admin/mechanic/detail/${item.userId}`}
                                  className="title-color"
                                >
                                  {item.userMechanicDto?.fullName}
                                </Link>
                              ) : (
                                <Link
                                  to={`/manager/mechanic/detail/${item.userId}`}
                                  className="title-color"
                                >
                                  {item.userMechanicDto?.fullName}
                                </Link>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="mb-1">
                            <strong>
                              <Link
                                to={`mailto:${item.userMechanicDto?.userEmail}`}
                                className="title-color hover-c1 lowercase"
                              >
                                {item.userMechanicDto?.userEmail}
                              </Link>
                            </strong>
                          </div>
                          <Link
                            to={`tel:${item.userMechanicDto?.userPhone}`}
                            className="title-color hover-c1 lowercase "
                          >
                            {item.userMechanicDto?.userPhone}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.level}</div>
                        </TableCell>
                        {/* Total Ordered */}
                        <TableCell
                          sx={{
                            border: "none",
                            textAlign: "center",
                            paddingRight: "40px",
                          }}
                        >
                          <Link
                            to={`/admin/orders/list/all?mechanic_id=${item.userId}`}
                            className="btn text--primary bg-soft--primary font-weight-bold px-3 py-1 mb-0 fz-12"
                          >
                            {item.totalOrders}
                          </Link>
                        </TableCell>
                        {/* status */}
                        {role === "Manager" ? (
                          <TableCell
                            sx={{
                              border: "none",
                              textAlign: "center",
                              paddingRight: "40px",
                            }}
                          >
                            <span
                              className={
                                item.mechanicStatus === "Available"
                                  ? "badge badge-soft-success fz-12"
                                  : "badge badge-soft-danger fz-12"
                              }
                            >
                              {" "}
                              {item.mechanicStatus === "Available"
                                ? "Rảnh"
                                : "Đang bận"}{" "}
                            </span>
                          </TableCell>
                        ) : (
                          <></>
                        )}

                        {/* Action */}
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="Chi tiết" arrow>
                              {role === "Admin" ? (
                                <Link
                                  to={`/admin/mechanic/detail/${item.userId}`}
                                  className="btn btn-outline-info btn-sm square-btn"
                                >
                                  <MoneyIcon fontSize="small" />
                                </Link>
                              ) : (
                                <Link
                                  to={`/manager/mechanic/detail/${item.userId}`}
                                  className="btn btn-outline-info btn-sm square-btn"
                                >
                                  <MoneyIcon fontSize="small" />
                                </Link>
                              )}
                            </Tooltip>
                            {/* <Tooltip title="delelte" arrow>
                              <Link
                                className="btn btn-outline-danger btn-sm delete square-btn"
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      "Are you sure to delete this record?",
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {},
                                  });
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </Link>
                            </Tooltip> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
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
      <ModalEdit
        show={showEdit}
        handleClose={handleClose}
        mechaEdit={mechaEdit}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Mechanics;
