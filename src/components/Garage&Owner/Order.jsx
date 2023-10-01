import React, { useEffect, useState } from "react";
import PendingIcon from "@mui/icons-material/Pending";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountBookingStatus,
  getBookingsByGarage,
} from "../../features/book/bookingSlide";
import useTableV2 from "../table/useTableV2";

const headCells = [
  { id: "bookingCode", label: "Mã đơn hàng" },
  { id: "bookingTime", label: "Giờ bắt đầu" },
  { id: "serviceDuration", label: "Thời gian" ,align: "center",},
  { id: "userBookingDto", label: "Thông tin khách hàng"  ,align: "center", },

  { id: "total", label: "Giá trị đơn hàng" },
  { id: "bookingStatus", label: "Trạng thái" ,align: "center",},
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Order = () => {
  useEffect(() => {
    document.title = "Danh sách đơn hàng";
  }, []);

  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[4];
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage, garageId: id };
    dispatch(getBookingsByGarage(data));
    dispatch(getCountBookingStatus(id));
  }, [id, page, rowsPerPage]);

  const records = useSelector((state) => state.booking.bookings);
  const count = useSelector((state) => state.booking.number);

  const statusDetail = useSelector((state) => state.booking.booking);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      records,
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
    <div className="tab-content">
      <div className="tab-pane fade show active">
        <div className="row pt-2">
          <div className="col-md-12">
            <div className="card w-100">
              {/* Title */}
              <div className="card-header">
                <h5 className="mb-0 font-semibold">Danh sách đơn hàng</h5>
              </div>
              {/* the number of the status */}
              <div className="card-body">
                <div className="row">
                  {/* All */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <WidthFullIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Tất cả</h6>
                      </div>
                      <div className="order-stats__title">{count}</div>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <CheckCircleSharpIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Hoàn thành</h6>
                      </div>
                      <div className="order-stats__title">
                        {statusDetail.completed}
                      </div>
                    </div>
                  </div>
                  {/* Pending */}
                  <div className="col-md-3  mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <PendingIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Sắp tới</h6>
                      </div>
                      <div className="order-stats__title">
                        {statusDetail.pending}
                      </div>
                    </div>
                  </div>
                  {/* Canceled */}
                  <div className="col-md-3  mb-3 mb-md-0">
                    <div className="order-stats order-stats_pending">
                      <div className="order-stats__content">
                        <HighlightOffIcon fontSize="inherit" />
                        <h6 className="order-stats__subtitle">Hủy bỏ</h6>
                      </div>
                      <div className="order-stats__title">
                        {statusDetail.canceled}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.bookingId}>
                        <TableCell sx={{ border: "none" }}>
                          <Link
                            to={`/admin/orders/details/${item.bookingId}`}
                            className="title-color hover-c1"
                          >
                            {item.bookingCode}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.bookingTime}</div>
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "none",
                            textAlign: "center",
                            paddingRight: "50px",
                          }}
                        >
                          {item.duration} giờ
                        </TableCell>
                        <TableCell sx={{ border: "none",textAlign: "center", paddingRight: "40px" }}>
                          <Link to={``} className="text-body text-capitalize">
                            <strong>{item.userBookingDto?.fullName}</strong>
                          </Link>
                          <Link
                            to={`tel:${item.userBookingDto?.userPhone}`}
                            className="d-block title-color"
                          >
                            {item.userBookingDto?.userPhone}
                          </Link>
                        </TableCell>

                        <TableCell sx={{ border: "none" }}>
                          <div>{item.totalPrice}</div>
                          <span
                            className={
                              item.paymentStatus === "Unpaid"
                                ? "badge text-danger fz-12 px-0"
                                : "badge text-success fz-12 px-0"
                            }
                          >
                            {" "}
                              {item.paymentStatus === "Unpaid"
                                ? "Chưa thanh toán"
                                : "Đã thanh toán"}{" "}
                          </span>
                        </TableCell>

                        <TableCell
                          sx={{
                            border: "none",
                            textDecoration: "capitalize",
                            textAlign: "center",
                            paddingRight: "30px",
                          }}
                        >
                           <span
                        className={
                          item.bookingStatus === "Pending"
                            ? "badge badge-soft-danger fz-12"
                            : item.bookingStatus === "CheckIn"
                            ? "badge badge-soft-warning fz-12"
                            : item.bookingStatus === "Processing"
                            ? "badge badge-soft-info fz-12"
                            : item.bookingStatus === "Completed"
                            ? "badge badge-soft-success fz-12"
                            : item.bookingStatus === "CheckOut"
                            ? "badge badge-soft-success fz-12"
                            :  item.bookingStatus === "Canceled"
                            ? "badge badge-danger fz-12"
                            : "badge badge-info fz-12"
                        }
                      >
                        {" "}
                              {item.bookingStatus === "Pending"
                                ? "Sắp tới"
                                : item.bookingStatus === "CheckIn"
                                ? "Đang làm"
                                : item.bookingStatus === "Completed"
                                ? "Hoàn thành"
                                : item.bookingStatus === "CheckOut"
                                ? "Đã xong"
                                :item.bookingStatus === "Processing"
                                ? "Đang tiến hành"
                                : item.bookingStatus === "Canceled"
                                ? "Hủy Bỏ"
                                :"Bảo Hành"}{" "}
                      </span>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="Chi tiết" arrow>
                              <Link
                                to={`/admin/orders/details/${item.bookingId}`}
                                className="btn btn-outline--primary btn-sm edit square-btn"
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
                <TblPagination className="pagination" />
              </div>
              <div className="table-responsive mt-4">
                <div className="px-4 d-flex justify-content-lg-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
