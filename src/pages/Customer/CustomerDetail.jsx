import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
// import CurrencyFormat from "react-currency-format";
import CustomerInfo from "../../components/card-info/CustomerInfo";
import CarInfo from "../../components/card-info/CarInfo";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCustomer } from "../../features/customer/customerSilde";
import { getBookingsCustomer } from "../../features/book/bookingSlide";
const headCells = [
  { id: "bookingId", label: "ID" },

  { id: "bookingCode", label: "Code" },
  { id: "bookingStatus", label: "Status" },
  { id: "totalPrice", label: "Total" },

  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];

const CustomerDetail = () => {
  const rows = [
    {
      id: 1,
      orderID: 1020392,
      total: "123,000",
    },
    {
      id: 2,
      orderID: 1034342,
      total: "1,000,000",
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[4];

  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage, userId: id };
    dispatch(getBookingsCustomer(data));
    dispatch(getDetailCustomer(id));
  }, [page, rowsPerPage, dispatch, id]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const recordsBookingOfCustomer = useSelector(
    (state) => state.booking.bookings
  );

  const count = useSelector((state) => state.booking.number);

  const detail = useSelector((state) => state.customer.customer);

  const cars = useSelector((state) => state.customer.cars);

  // console.log("car", detail.userCustomerDto);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsBookingOfCustomer,
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
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <div className="pb-2">
        <div className="row align-items-center">
          <div className="col-sm mb-2 mb-sm-0">
            <Header
              icon="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
              size={20}
              alt="customer"
              title="Customer Details"
            />
            <div className="d-sm-flex align-align-items-sm-center">
              <h3 className="page-header-title text-lg font-semibold">
                Customer ID #{id}
              </h3>
              <span className="ml-2 ml-sm-3 ">
                <EventNoteIcon fontSize="inherit" />
                Join At: {detail.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Table & Search input */}
        <div className="col-lg-8 mb-3 mb-lg-0">
          <div className="card">
            {/* Search */}
            <div className="p-3">
              <div className="row justify-content-end">
                <div className="col-auto">
                  <Search
                    label="Search here"
                    onChange={() => {}}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="table-responsive">
              <TblContainer>
                <TblHead />

                <TableBody>
                  {recordsAfterPagingAndSorting().length > 0 ? (
                    recordsAfterPagingAndSorting().map((item) => (
                      <TableRow hover key={item.bookingId}>
                        <TableCell sx={{ border: "none", fontSize: "14px" }}>
                          <Link
                            to={`/admin/orders/details/${item.bookingId}`}
                            className="title-color hover-c1 d-flex align-items-center gap-3 "
                          >
                            {item.bookingId}
                          </Link>
                        </TableCell>
                        {/* Order ID */}
                        <TableCell sx={{ border: "none", fontSize: "14px" }}>
                          {item.bookingCode}
                        </TableCell>

                        <TableCell sx={{ border: "none", fontSize: "14px" }}>
                          <div
                            className={
                              item.bookingStatus === "Pending"
                                ? "badge badge-soft-danger fz-12"
                                : item.bookingStatus === "CheckIn"
                                ? "badge badge-soft-warning fz-12"
                                : item.bookingStatus === "Processing"
                                ? "badge badge-soft-info fz-12"
                                : item.bookingStatus === "Completed"
                                ? "badge badge-soft-success fz-12"
                                : "badge badge-danger fz-12"
                            }
                          >
                            {item.bookingStatus}
                          </div>
                        </TableCell>
                        {/* Total */}
                        <TableCell sx={{ border: "none", fontSize: "14px" }}>
                          {/* <CurrencyFormat
                            value={item.totalPrice}
                            displayType={"text"}
                            format={"###,###,### VND"}
                          /> */}
                          {item.totalPrice}
                        </TableCell>

                        {/* Action */}
                        <TableCell sx={{ border: "none" }}>
                          <div className="d-flex justify-content-center gap-2">
                            <Tooltip title="view" arrow>
                              <Link
                                to={`/admin/orders/details/${item.bookingId}`}
                                className="btn btn-outline--primary btn-sm edit square-btn"
                              >
                                <VisibilityIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                            <Tooltip title="Invoice" arrow>
                              <Link className="btn btn-outline-info btn-sm square-btn">
                                <DownloadForOfflineSharpIcon fontSize="small" />
                              </Link>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div className="text-center p-4">
                          <img
                            src="https://6valley.6amtech.com/public/assets/back-end/svg/illustrations/sorry.svg"
                            alt=""
                            className="mb-3 w-160"
                          />
                          <p>Không có dữ liệu</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TblContainer>

              <TblPagination />
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
        {/* Info of Customer */}
        <div className="col-lg-4  d-flex flex-column gap-3">
          <CustomerInfo
            title={"Customer"}
            srcIcon={
              "https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
            }
            name={detail.fullName}
            content={"Orders"}
            phone={detail.userPhone}
            email={detail.userEmail}
          />

          {cars.map((item) => (
            <CarInfo
              key={item.carLicensePlate}
              title={"Car Info"}
              brand={item.carBrand}
              model={item.carFuelType}
              plate={item.carLicensePlate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
