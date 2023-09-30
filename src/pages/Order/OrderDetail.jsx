import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import PrintIcon from "@mui/icons-material/Print";
import useTableV2 from "../../components/table/useTableV2";
import { Link, useLocation } from "react-router-dom";
import CustomerInfo from "../../components/card-info/CustomerInfo";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getDetailBooking, AddWarrantyBookingg, resetStateBooking } from "../../features/book/bookingSlide";
import { useDispatch, useSelector } from "react-redux";
import TableOrderDetail from "../../components/order-detail/TableOrderDetail";
import MechanicsOrder from "../../components/order-detail/MechanicsOrder";
import PaidIcon from "@mui/icons-material/Paid";
import ModalMoney from "./ModalMoney";
import Notification from "../../components/Notification";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ModalStatus from "./ModalStatus";
import ModalDetail from "./ModalDetail";
import ModalWarranty from "./ModalWarranty";
import Popup from "../../components/Popup";
import AddWarrantyBooking from "../../components/order-detail/AddWarrantyBooking";
const headCells = [
  { id: "bookingDetailId", label: "Id" },

  {
    id: "serviceBookingDetailDto",
    label: "Chi tiết ",
    disableSorting: true,
  },
  { id: "serviceCost", label: "Giá DV (VND)" },
  { id: "serviceDuration", label: "Thời gian" },
  { id: "serviceWarrantyPeriod", label: "Bảo Hành", align: "center" },
  { id: "bookingDetailStatus", label: "Trạng Thái", align: "center" },
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const tabs = ["Chi tiết", "Thợ phụ trách"];
const OrderDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [type, setType] = useState("Chi tiết");
  const [open, setOpen] = React.useState(false);
  const [bid, setBid] = useState("");
  const [statusData, setStatusData] = useState("");
  const [statusPaid, setStatusPaid] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const statusState = useSelector(
    (state) => state.booking.booking.bookingStatus
  );
  const sttPaid = useSelector((state) => state.booking.booking.paymentStatus);
  useEffect(() => {
    dispatch(getDetailBooking(id));
    setStatusData(statusState);
    setStatusPaid(sttPaid);
  }, [id, statusState, sttPaid]);

  const booking = useSelector((state) => state.booking.booking);
  const orderId = booking.bookingId;
  const garage = useSelector((state) => state.booking.garage);
  const detail = useSelector((state) => state.booking.detail);
  // console.log(detail);
  const customer = useSelector((state) => state.booking.customer);
  const status = useSelector((state) => state.booking);
  const { message, isSuccessAdd } = status;
  const getData = () => {
    dispatch(getDetailBooking(id));
  };
  useEffect(() => {
    getData();
    if (isSuccessAdd === true) {
      setNotify({
        isOpen: true,
        message: "Thành Công",
        type: "success",
      });
      handleClose();
    } else if (message.status === 404) {
      setNotify({
        isOpen: true,
        message: message.title,
        type: "error",
      });
    }
  }, [isSuccessAdd, message]);
  //Add
  const [showModal, setShowModal] = useState(false);
  const [money, setMoney] = useState("");
  const [warranty, setWarranty] = useState("");
  const [showWarranty, setModalWarranty] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowStt(false);
    setShowDetail(false);
    setModalWarranty(false);
  };
  const handleMoney = (orderId) => {
    setShowModal(true);
    setMoney(orderId);
  };
  const handleWarranty = (orderId) => {
    setModalWarranty(true);
    setWarranty(orderId);
  };
  //STT
  const [showStt, setShowStt] = useState(false);
  const [orderSta, setOrderSta] = useState("");
  const handleStt = (orderId) => {
    setShowStt(true);
    setOrderSta(orderId);
  };
  //Detail
  const [showDetail, setShowDetail] = useState(false);
  const [detailService, setDetail] = useState("");
  const handleDetail = (item) => {
    setShowDetail(true);
    setDetail(item);
  };
  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTableV2(
    detail,
    headCells,
    filterFn
  );
  const addSuccessAction = useSelector(
    (state) => state.booking?.isSuccessAdd
  );
  // THÊM ĐƠN BẢO HÀNH 
  const addWarrantyBooking = (data, resetForm) => {

    // console.log({bookingId:id , ...data});

    if(data.serviceList.length > 0) {

      dispatch(AddWarrantyBookingg({ bookingId: id, ...data }))
      resetForm();
      setOpenPopup(false);
      if (addSuccessAction) {
        dispatch(resetStateBooking());
        dispatch(getDetailBooking(id))
        setNotify({
          isOpen: true,
          message: "Add Successfully",
          type: "success",
        });
      }
    }else {
      setOpenPopup(true);
      setNotify({
        isOpen: true,
        message: "Hãy chọn dịch vụ để bảo hành",
        type: "error",
      });
    }
      
  };
  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
          size={20}
          alt="order-detail"
          title="Chi tiết đơn hàng"
        />
        {/* Info Invoice */}
        <div className="row gy-3">
          <div className="col-lg-8 col-xl-9">
            <div className="card h-100">
              <div className="card-body">
                {/* Info of Order */}
                <div className="d-flex flex-wrap gap-3 justify-content-between mb-4">
                  <div className="d-flex flex-column gap-3">
                    <h4 className="capitalize font-semibold">
                      ID Đơn hàng #{booking.bookingId}
                    </h4>
                    <div>
                      <EventNoteIcon fontSize="inherit" /> {booking.bookingTime}
                    </div>
                    {booking.warrantyReason !== null ? (
                      <div className="payment-status d-flex justify-content-sm-end gap-3">
                        <span className="text-info title-color">
                          Lý do bảo hành:{" "}
                        </span>
                        <span
                          className={"text-secondary font-weight-bold"}
                        >
                          {" "}{booking.warrantyReason}{" "}
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-sm-right">
                    <div className="d-flex flex-wrap gap-3">
                      <div>
                        {statusPaid === "Paid" ||
                          booking.bookingStatus === "Canceled" ? (
                          <Button
                            disabled={true}
                            className="add-button"
                            size="large"
                            onClick={() => handleMoney(orderId)}
                            startIcon={<PaidIcon fontSize="small" />}
                            text="Thanh toán"
                          />
                        ) : (
                          <Button
                            className="add-button"
                            size="large"
                            onClick={() => handleMoney(orderId)}
                            startIcon={<PaidIcon fontSize="small" />}
                            text="Thanh toán"
                          />
                        )}
                      </div>
                      {statusData === "Pending" ? (
                        <Button
                          className="add-button"
                          size="large"
                          onClick={() => handleStt(orderId)}
                          startIcon={<NoteAltIcon fontSize="small" />}
                          text="Cập nhật trạng thái"
                        />
                      ) : statusData === "CheckIn" ? (
                        <Button
                          className="add-button"
                          size="large"
                          onClick={() => handleStt(orderId)}
                          startIcon={<NoteAltIcon fontSize="small" />}
                          text="Cập nhật trạng thái"
                        />
                      ) : booking.bookingStatus === "Completed"
                        && statusPaid === "Paid" ? (
                        <Button
                          disabled={booking.warrantyReason !== null ? true : false}
                          className="add-button"
                          size="large"
                          onClick={() => {
                            setOpenPopup(true);
                          }}
                          startIcon={<NoteAltIcon fontSize="small" />}
                          text="Bảo Hành"
                        />
                      ) : booking.bookingStatus === "Warranty" ? (  <Button
                        className="add-button"
                        size="large"
                        onClick={() => handleStt(orderId)}
                        startIcon={<NoteAltIcon fontSize="small" />}
                        text="Cập nhật trạng thái"
                      />) : (
                        <Button
                          disabled={true}
                          className="add-button"
                          size="large"
                          onClick={() => handleStt(orderId)}
                          startIcon={<NoteAltIcon fontSize="small" />}
                          text="Cập nhật trạng thái"
                        />
                      )}
                    </div>
                    {/* Status */}
                    <div className="d-flex flex-column gap-2 mt-3">
                      <div className="order-status d-flex justify-content-sm-end gap-3 text-capitalize">
                        <span className="title-color">Trạng thái: </span>

                        <span
                          className={
                            booking.bookingStatus === "Pending"
                              ? "badge badge-soft-danger fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm "
                              : booking.bookingStatus === "CheckIn"
                                ? "badge badge-soft-warning fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                                : booking.bookingStatus === "Processing"
                                  ? "badge badge-soft-info fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                                  : booking.bookingStatus === "Completed"
                                    ? "badge badge-soft-success fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                                    : booking.bookingStatus === "CheckOut"
                                      ? "badge badge-soft-success fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                                      : booking.bookingStatus === "Canceled"
                                        ? "badge badge-danger fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                                        : "badge badge-info fz-12 font-weight-bold radius-50 d-flex align-items-center py-1 px-2 text-sm"
                          }
                        >
                          {" "}
                          {booking.bookingStatus === "Pending"
                            ? "Sắp tới"
                            : booking.bookingStatus === "CheckIn"
                              ? "Đang làm"
                              : booking.bookingStatus === "Completed"
                                ? "Hoàn thành"
                                : booking.bookingStatus === "CheckOut"
                                  ? "Đã xong"
                                  : booking.bookingStatus === "Processing"
                                    ? "Đang tiến hành"
                                    : booking.bookingStatus === "Canceled"
                                      ? "Hủy Bỏ"
                                      : "Bảo Hành"}{" "}
                        </span>
                      </div>
                      {/* Payment status */}
                      <div className="payment-status d-flex justify-content-sm-end gap-3">
                        <span className="title-color">
                          Trạng thái thanh toán:{" "}
                        </span>
                        <span
                          className={
                            booking.paymentStatus === "Paid"
                              ? "text-success font-weight-bold"
                              : "text-danger font-weight-bold"
                          }
                        >
                          {" "}
                          {booking.paymentStatus === "Unpaid"
                            ? "Chưa thanh toán"
                            : "Đã thanh toán"}{" "}
                        </span>
                      </div>
                      {/* Accepted status */}
                      {booking.waitForAccept === true ? (
                        <div className="payment-status d-flex justify-content-sm-end gap-3">
                          <span className="title-color">
                            Trạng thái chỉnh sửa:{" "}
                          </span>
                          <span
                            className={
                              booking.waitForAccept === true
                                ? "text-warning font-weight-bold "
                                : booking.waitForAccept === false
                                  ? "text-success font-weight-bold"
                                  : ""
                            }
                          >
                            {" "}
                            {booking.waitForAccept === true
                              ? "Chưa đồng ý"
                              : booking.waitForAccept === false
                                ? "Đồng ý"
                                : "Không chỉnh sửa"}{" "}
                          </span>
                        </div>
                      ) : <></>}

                    </div>
                  </div>
                </div>
                <div className="mb-7">
                  <div
                    className="js-nav-scroller hs-nav-scroller-horizontal"
                    style={{ backgroundColor: "#f9f9fb", margin: "0 -1.315rem" }}
                  >
                    <ul className="nav nav-tabs flex-wrap page-header-tabs">
                      {tabs.map((tap) => (
                        <li
                          style={{ backgroundColor: "#f9f9fb", zIndex: 10 }}
                          className="nav-item"
                          key={tap}
                        >
                          <Link
                            className={
                              tap === type
                                ? "nav-link active"
                                : "nav-link capitalize"
                            }
                            onClick={() => setType(tap)}
                          >
                            {tap}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {type === "Chi tiết" && (
                  <TableOrderDetail
                    detail={recordsAfterPagingAndSorting()}
                    booking={booking}
                    TblContainer={TblContainer}
                    TblHead={TblHead}
                    setBid={setBid}
                    bid={bid}
                    setOpen={setOpen}
                    open={open}
                    key={booking}
                    show={showDetail}
                    handleDetail={handleDetail}
                    handleClose={handleClose}
                    setDetail={setDetail}
                    detailService={detailService}
                    statusData={statusData}
                  />
                )}
                {type === "Thợ phụ trách" && (
                  <MechanicsOrder bookingId={id} status={booking.bookingStatus} />
                )}
              </div>
            </div>
          </div>
          {/* Info customer mechanic and garage */}
          <div className="col-lg-4 col-xl-3 d-flex flex-column gap-3">
            <CustomerInfo
              title={"Khách hàng"}
              srcIcon={
                "https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
              }
              src={customer.userImage}
              name={customer.fullName}
              phone={customer.userPhone}
              email={customer.userEmail}
            />
            <CustomerInfo
              title={"Thông tin garage"}
              srcIcon={
                "https://6valley.6amtech.com/public/assets/back-end/img/shop-information.png"
              }
              src={garage.garageImage}
              name={garage.garageName}
              phone={garage.garageStatus}
              icon={<LocationOnIcon fontSize="inherit" />}
              location={garage.fullAddress}
            />
          </div>
          <ModalMoney show={showModal} handleClose={handleClose} money={money} />
          <ModalStatus
            show={showStt}
            handleClose={handleClose}
            orderSta={orderSta}
          />
          <ModalWarranty
            show={showWarranty}
            handleClose={handleClose}
            warranty={warranty}
          />
          <Notification notify={notify} setNotify={setNotify} />
          {statusData === "Pending" ? (
            <ModalDetail
              show={showDetail}
              handleClose={handleClose}
              detailService={detailService}
              setDetail={setDetail}
            />
          ) : statusData === "CheckIn" ? (
            <ModalDetail
              show={showDetail}
              handleClose={handleClose}
              detailService={detailService}
              setDetail={setDetail}
            />
          ) : (
            <ModalDetail
              show={showDetail}
              handleClose={handleClose}
              detailService={detailService}
              setDetail={setDetail}
            />
          )}
        </div>
      </div>
      <Popup title="Thêm mới bảo hành" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddWarrantyBooking addWarrantyBooking={addWarrantyBooking} />
      </Popup>
    </>
  );
};

export default OrderDetail;
