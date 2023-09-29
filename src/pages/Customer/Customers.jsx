import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  getCustomersForManager,
  getNumberCustomer,
  updateCustomerStatus,
  resetState,
} from "../../features/customer/customerSilde";
import Notification from "../../components/Notification";
import authService from "../../features/auth/authService";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Tên khách hàng" },
  { id: "userEmail", label: "Thông tin khách hàng" },
  { id: "totalBooking", label: "SL đơn hàng" ,align:"center"},
  { id: "userStatus", label: "Hoạt động/Cấm" ,align:"center"},
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,

    align: "center",
  },
];

const Customers = () => {

  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size

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

  const updateSuccessAction = useSelector((state) => state.customer.isSuccessAction);
  useEffect(() => {
    document.title = "Danh sách khách hàng"
  })

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };

    if (role === "Admin") dispatch(getCustomers(data));
    else if (role === "Manager")
    dispatch(getCustomersForManager(data));

    dispatch(getNumberCustomer());

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
  }, [page, updateSuccessAction, rowsPerPage]);

  const recordsCustomer = useSelector((state) => state.customer.customers);
  const count = useSelector((state) => state.customer.number);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // console.log("records", recordsCustomer);

  const handleSwitchToggle = (userId, userStatus) => {
    // Dispatch the updateCustomerStatus action
    // console.log(userId, userStatus);
    dispatch(updateCustomerStatus({ userId, userStatus }));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsCustomer,
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
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
          size={20}
          alt="customer"
          title="Danh sách khách hàng"
          number={count}
        />
        <div className="card">
          <div className="px-3 py-4">

          </div>
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.userId}>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.userId}</div>
                    </TableCell>
                    {/* NAME AND IMAGE */}
                    <TableCell sx={{ border: "none" }}>
                      {role === "Admin" ? (
                        <Link

                          to={`/admin/customer/view/${item.userId}`}
                          className="title-color hover-c1 d-flex align-items-center gap-3 "
                        >
                          <img
                            src={item.userImage}
                            alt="avatar"
                            width="40"
                            className="rounded-circle"
                          />
                          {item.fullName}
                        </Link>
                      ) : (
                        <Link

                          to={`/manager/customer/view/${item.userId}`}
                          className="title-color hover-c1 d-flex align-items-center gap-3 "
                        >
                          <img
                            src={item.userImage}
                            alt="avatar"
                            width="40"
                            className="rounded-circle"
                          />
                          {item.fullName}
                        </Link>
                      )}
                    </TableCell>
                    {/* EMAIL AND PHONE */}
                    <TableCell sx={{ border: "none" }}>
                      <div className="mb-1">
                        <strong>
                          <Link
                            to={`mailto:${item.userEmail}`}
                            className="title-color hover-c1 lowercase"
                          >
                            {item.userEmail}
                          </Link>
                        </strong>
                      </div>
                      <Link
                        to={`tel:${item.userPhone}`}
                        className="title-color hover-c1 lowercase"
                      >
                        {item.userPhone}
                      </Link>
                    </TableCell>
                    {/* Quantity Ordered */}
                    <TableCell sx={{ border: "none", textAlign:"center", paddingRight:"40px" }}>
                      <label className="btn text-info bg-soft-info font-weight-bold px-3 py-1 mb-0 fz-12">
                        {item.totalBooking}
                      </label>
                    </TableCell>
                    {/* Block and unblock */}
                    <TableCell sx={{ border: "none", textAlign:"center", paddingRight:"40px" }}>
                      <Switches
                        checked={item.userStatus === "Activate" ? true : false}
                        onChange={(event) => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Bạn có chắc chắn muốn thay đổi trạng thái ?",
                            subTitle: "Bạn không thể hoàn tác thao tác này",
                            onConfirm: () => {
                              handleSwitchToggle(
                                item.userId,
                                event.target.checked ? 1 : 0
                              );
                            },
                          });
                        }}
                      />
                    </TableCell>
                    {/* Action */}
                    <TableCell sx={{ border: "none", textAlign:"center", paddingRight:"40px" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Tooltip title="Chi tiết" arrow>
                          {role === "Admin" ? (
                            <Link
                              to={`/admin/customer/view/${item.userId}`}
                              className="btn btn-outline-info btn-sm square-btn"
                            >
                              <VisibilityIcon fontSize="small" />
                            </Link>
                          ) : (
                            <Link
                              to={`/manager/customer/view/${item.userId}`}
                              className="btn btn-outline-info btn-sm square-btn"
                            >
                              <VisibilityIcon fontSize="small" />
                            </Link>
                          )}
                        </Tooltip>
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
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} severity="success" />
    </>
  );
};

export default Customers;
