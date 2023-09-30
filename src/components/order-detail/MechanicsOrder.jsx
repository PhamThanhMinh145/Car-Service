import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "../filter/Button";
import { useDispatch, useSelector } from "react-redux";
import useTableV2 from "../table/useTableV2";
import Notification from "../Notification";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../ConfirmDialog";
import {
  getMechanicsByBookingId,
  updateMechanicByBookingId,
  AddMechanicsByBooking,
  resetState,
} from "../../features/mechanic/mechanicSlice";
import Popup from "../Popup";
import authService from "../../features/auth/authService";
import AddNewMechanicForBooking from "./AddNewMechanicForBooking";

const headCells = [
  { id: "fullName", label: "Thợ phụ trách" },
  { id: "contact", label: "Thông tin thợ" },
  { id: "level", label: "Cấp bậc" },
  //{ id: "userStatus", label: "Trạng thái" },

  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];
const MechanicsOrder = ({ bookingId, status }) => {
  useEffect(() => {
    document.title = "Danh sách thợ thực hiện";
  }, []);
  const user = authService.getCurrentUser();
  const role = user?.roleName;

  const headCellsCompleted = [
    { id: "fullName", label: "Thợ phụ trách" },
    { id: "contact", label: "Thông tin thợ" },
    { id: "level", label: "Cấp bậc" },
    //{ id: "userStatus", label: "Trạng thái" },
  ];
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
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
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateSuccessAction = useSelector(
    (state) => state.mechanic.isSuccessAction
  );

  const addMechanicBooking = (mechanicId, resetForm) => {
    // console.log(mechanicId, bookingId);
    dispatch(AddMechanicsByBooking({ bookingId, mechanicId }));
    resetForm();
    setOpenPopup(false);
    if (updateSuccessAction) {
      dispatch(resetState());
      dispatch(getMechanicsByBookingId(bookingId));
      setNotify({
        isOpen: true,
        message: "Add Successfully",
        type: "success",
      });
    }
  };

  useEffect(() => {
    dispatch(getMechanicsByBookingId(bookingId));
    if (updateSuccessAction) {
      dispatch(resetState());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: "Delete Successfully",
        type: "success",
      });
    }
  }, [bookingId, updateSuccessAction]);
  const recordsMechanic = useSelector((state) => state.mechanic.mechanics);

  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTableV2(
    recordsMechanic,
    status === "Completed" || status === "Canceled"
      ? headCellsCompleted
      : headCells,
    filterFn
  );

  const handleDeleteMechanic = (mechanicId) => {
    dispatch(updateMechanicByBookingId({ bookingId: bookingId, mechanicId }));
  };
  // console.log(status);
  return (
    <>
      {status === "Completed" ||
      status === "Canceled" ||
      status === "Pending" ? (
        <></>
      ) : role === "Manager" ?  (
        <div className="row justify-content-end align-items-end mb-4">
          <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
            <div className="d-flex justify-content-sm-end">
              <Button
                className="add-button"
                size="small"
                onClick={() => {
                  setOpenPopup(true);
                }}
                startIcon={<AddIcon fontSize="small" />}
                text="Thêm mới "
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Table */}
      <div className="table-responsive">
        <TblContainer>
          <TblHead />
          {status === "Completed" ||
          status === "Canceled" ||
          status === "Pending" ? (
            <TableBody>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex flex-col items-center">
                  <img
                    src="https://6valley.6amtech.com/public/assets/back-end/svg/illustrations/sorry.svg"
                    alt=""
                    className="mb-3 w-160"
                  />
                  {status === "Completed" ? (
                    <p>Không có dữ liệu vì đơn hàng đã hoàn thành </p>
                  ) : status === "Canceled" ? (
                    <p>Không có dữ liệu vì đơn hàng đã hủy </p>
                  ) : (
                    <p>Không có dữ liệu vì đơn hàng chưa check-in </p>
                  )}
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableBody>
          ) : (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow hover key={item.userId}>
                  <TableCell sx={{ border: "none" }}>
                    <div className="media align-items-center gap-2">
                      <div>
                        <Link
                          to={`/admin/mechanic/detail/${item.userId}`}
                          className="title-color"
                        >
                          {item.userMechanicDto?.fullName}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Link
                      to={`tel:${item.userMechanicDto?.userPhone}`}
                      className="title-color hover-c1 lowercase "
                    >
                      {item.userMechanicDto?.userPhone}
                    </Link>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Link
                      to={`tel:${item.level}`}
                      className="title-color hover-c1 lowercase "
                    >
                      {item.level}
                    </Link>
                  </TableCell>
                  {/* status */}

                  {/* <TableCell sx={{ border: "none" }}>
                    <span
                      className={
                        item.userMechanicDto?.userStatus === 1
                          ? "badge badge-soft-success fz-12"
                          : "badge badge-soft-danger fz-12"
                      }
                    >
                      {""}
                      {item.userMechanicDto?.userStatus === 1
                        ? "Khả Dụng"
                        : "Không Khả Dụng"}
                      {""}
                    </span>
                  </TableCell> */}

                  {/* Action */}
                  {status === "Completed" || status === "Canceled" ? (
                    <></>
                  ) : (
                    <TableCell sx={{ border: "none" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Tooltip title="Xóa thợ" arrow>
                          <div
                            className="btn btn-outline-danger btn-sm delete square-btn"
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title:
                                  "Bạn có chắc chắn muốn thay đổi trạng thái ?",
                                subTitle: "Bạn không thể hoàn tác thao tác này",
                                onConfirm: () => {
                                  handleDeleteMechanic(item.userId);
                                },
                              });
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </div>
                        </Tooltip>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </TblContainer>
      </div>
      <Popup title="Thêm mới" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddNewMechanicForBooking addMechanicBooking={addMechanicBooking} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default MechanicsOrder;
