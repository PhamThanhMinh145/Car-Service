import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import {
  updateProductForBookingDetailBookingDetail,
  getDetailBooking,
  resetStateBooking,
} from "../../features/book/bookingSlide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../Popup";
import EditProduct from "./EditNewProduct";
import ConfirmDialog from "../ConfirmDialog";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
const TableOrderDetail = ({
  detail,
  booking,
  TblContainer,
  TblHead,
  setBid,
  bid,
  setOpen,
  open,
  key,
  setDetail,
  detailService,
  handleClose,
  handleDetail,
  show,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [serviceId, setServiceId] = useState(0);
  const [bookingDetailId, setBookingDetailId] = useState(0);
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
  const bookingStatus = useSelector(
    (state) => state.booking.booking?.bookingStatus
  );
  const openInPopup = (id, name, serviceId, bookingDetailId) => {
    // console.log(id, name);
    setRecordForEdit({ productId: id, productName: name });
    setBookingDetailId(bookingDetailId);
    setServiceId(serviceId);
    setOpenPopup(true);
  };
  const updateSuccessAction = useSelector(
    (state) => state.mechanic.isSuccessAdd
  );
  const editProductBooking = (productId, resetForm) => {
    console.log(productId, bookingDetailId);
    dispatch(
      updateProductForBookingDetailBookingDetail({ bookingDetailId, productId })
    );
    resetForm();
    setOpenPopup(false);
    if (updateSuccessAction) {
      dispatch(resetStateBooking());
      dispatch(getDetailBooking(id));
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
    }
  };
  // console.log(recordForEdit);
  return (
    <>
      {/* Table */}
      <div className="table-responsive">
        <TblContainer>
          <TblHead />
          <TableBody key={key}>
            {detail.map((item) => (
              <>
                <TableRow
                  hover
                  key={item.bookingDetailId}
                  className={` ${item.isNew === false ? "line-through" : ""}`}
                >
                  <TableCell sx={{ border: "none" }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        setBid(item.bookingDetailId);
                        setOpen(!open);
                      }}
                    >
                      {item.bookingDetailId === bid && open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div className="media align-items-center gap-3">
                      <div>
                        <h6 className="title-color font-semibold">
                          {item.serviceBookingDetailDto?.serviceName}
                        </h6>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell sx={{ border: "none" }}>
                    {item.serviceBookingDetailDto?.serviceCost}
                  </TableCell>
                  <TableCell sx={{ border: "none", textAlign:"center" , paddingRight:"30px" }}>
                    {item.serviceBookingDetailDto?.serviceDuration} giờ
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    {item.serviceBookingDetailDto?.serviceWarranty === ""
                      ? "Không bảo hành"
                      : `${item.serviceBookingDetailDto?.serviceWarranty}`}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <span
                      className={`${
                        item.bookingDetailStatus === "NotStart"
                          ? "badge badge-soft-warning fz-12"
                          : item.bookingDetailStatus === "Done"
                          ? "badge badge-soft-success fz-12"
                          : "badge badge-soft-danger fz-12"
                      } ${
                        item.isNew === false
                          ? "line-through decoration-black"
                          : ""
                      }`}
                    >
                      {item.bookingDetailStatus === "NotStart"
                        ? "Chưa bắt đầu"
                        : item.bookingDetailStatus === "Done"
                        ? "Hoàn Thành"
                        : "Không hoàn thành"}
                    </span>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <div className="d-flex justify-content-center gap-2">
                      <Tooltip title=" Sửa" arrow>
                        <Link
                          onClick={() => handleDetail(item.bookingDetailId)}
                          className={`btn btn-outline--primary btn-sm edit square-btn ${
                            bookingStatus === "Canceled" ||
                            bookingStatus === "Pending" ||
                            //bookingStatus === "Warranty" ||
                            item.isNew === false
                              ? "pointer-events-none opacity-50"
                              : item.bookingDetailStatus === "NotStart"
                              ? ""  
                              : "pointer-events-none opacity-50"
                          }`}
                        >
                          <EditIcon fontSize="small" />
                        </Link>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
                {/*  PRODUCT */}
                 
                {item.productBookingDetailDto !== null && item.bookingDetailId === bid ? (
                  <TableRow key={item.productCost}>
                    <TableCell
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        border: "none",
                      }}
                      colSpan={6}
                    >
                      <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        key={item.bookingDetailId}
                      >
                        <Box>
                          <Typography variant="h6" gutterBottom component="div">
                            Sản phẩm
                          </Typography>
                        </Box>
                        <Table aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Id
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Sản phẩm đính kèm
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Bảo hành
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Giá sản phẩm
                              </TableCell>
                              {bookingStatus === "Canceled" ? (
                                <></>
                              ) : item.bookingDetailStatus === "NotStart" ? (
                                <TableCell
                                  sx={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    alignItems: "center",
                                  }}
                                >
                                  Thao Tác
                                </TableCell>
                              ) : (
                                <></>
                              )}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              hover
                              className={` ${
                                item.isNew === false ? "line-through" : ""
                              }`}
                            >
                              <TableCell sx={{ border: "none" }}>
                                {item.productBookingDetailDto?.productId}
                              </TableCell>
                              <TableCell sx={{ border: "none" }}>
                                {item.productBookingDetailDto?.productName}
                              </TableCell>
                              <TableCell sx={{ border: "none" }}>
                                {item.productBookingDetailDto?.productWarranty === ""
                                  ? "Không bảo hành"
                                  : item.productBookingDetailDto?.productWarranty !== null ?`${item.productBookingDetailDto?.productWarranty}`: ""}
                              </TableCell>
                              <TableCell sx={{ border: "none" }}>
                                {item.productBookingDetailDto?.productCost}
                              </TableCell>
                              {item.productBookingDetailDto !== null ? (
                                bookingStatus === "Canceled" ? (
                                  <></>
                                ) : item.bookingDetailStatus === "NotStart" ? (
                                  <TableCell
                                    sx={{ border: "none", paddingLeft: "28px" }}
                                  >
                                    <Tooltip title="Sửa sản phẩm" arrow>
                                      <Link
                                        onClick={() => {
                                          openInPopup(
                                            item.productBookingDetailDto
                                              ?.productId,
                                            item.productBookingDetailDto
                                              ?.productName,
                                            item.serviceBookingDetailDto
                                              ?.serviceId,
                                            item.bookingDetailId
                                          );
                                        }}
                                        className={`btn btn-outline-danger btn-sm delete square-btn ${
                                          bookingStatus === "Canceled" ||
                                          bookingStatus === "Pending"  ||
                                          bookingStatus === "Warranty" ||
                                          item.isNew === false
                                            ? "pointer-events-none opacity-50"
                                            : item.bookingDetailStatus === "NotStart"
                                            ? ""
                                            : "pointer-events-none opacity-50"
                                        }`}
                                      >
                                        <EditIcon fontSize="small" />
                                      </Link>
                                    </Tooltip>
                                  </TableCell>
                                ) : (
                                  <></>
                                )
                              ) : (
                                <></>
                              )}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
              </>
            ))}
          </TableBody>
        </TblContainer>
      </div>
      <hr className="my-3" />

      {/* Total Price */}
      <div className="row justify-content-md-end mb-3">
        <div className="col-md-9 col-lg-8">
          <dl className="row gy-1 text-sm-right">
            <dt className="col-5">Tổng tiền dịch vụ</dt>
            <dd className="col-6 title-color">
              <strong>{booking.originalPrice}</strong>
            </dd>
            <dt className="col-5">Voucher từ garage</dt>
            <dd className="col-6 title-color">-{booking.discountPrice}</dd>
            <dt className="col-5 ">Thành tiền</dt>
            <dd className="col-6 title-color">
              <strong>{booking.totalPrice}</strong>
            </dd>
            <dt className="col-5 ">
              <strong>Tổng tiền khách phải trả</strong>
            </dt>
            <dd className="col-6 title-color">
              <strong>{booking.finalPrice}</strong>
            </dd>
          </dl>
        </div>
      </div>
      <Popup 
        title="Sửa sản phẩm"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditProduct
          editProductBooking={editProductBooking}
          serviceId={serviceId}
          record={recordForEdit}
        />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default TableOrderDetail;
