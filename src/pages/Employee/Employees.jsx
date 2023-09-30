import "../../styles/button.scss";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Search from "../../components/filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow } from "@mui/material";
import Switches from "../../components/table/Switches";

import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  resetState,
} from "../../features/employee/employeeSlice";
import ModalAdd from "./AddEmploye";
import ModalEdit from "./ModalEdit";
import Notification from "./../../components/Notification";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Tên nhân viên" },

  { id: "userEmail", label: "Email" },
  { id: "userPhone", label: "SĐT" },
  { id: "roleName", label: "Vai trò", align:"center" },
  { id: "userStatus", label: "Trạng thái" ,align:"center"},
  // {
  //   id: "action",
  //   label: "Thao tác",
  //   disableSorting: true,

  //   align: "center",
  // },
];

const Employees = () => {
  useEffect(() => {
    document.title = "Danh sách nhân viên (quản lý & quản trị viên)";
  }, []);

  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  //Edit
  const [showEdit, setShowEdit] = useState(false);
  const [employEdit, setEmployEdit] = useState({});
  const handleEdit = (employ) => {
    setEmployEdit(employ);
    setShowEdit(true);
  };
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
  //Call API List
  const getData = () => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getEmployees(data));
  };
  const empState = useSelector((state) => state.employee);
  const { isSuccessAdd, message } = empState;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    getData();
    if (isSuccessAdd) {
      dispatch(resetState());
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
  }, [page, rowsPerPage, isSuccessAdd, message]);

  const recordsEmployee = useSelector((state) => state.employee.employees);
  const count =  useSelector((state) => state.employee.number);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsEmployee,
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
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/employee.png"
        size={count}
        alt="employee"
        title="Danh sách nhân viên"
      />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header flex-wrap gap-10">
              <h5 className="mb-0 d-flex gap-2 align-items-center font-semibold">
                Bảng danh sách
                <span className="badge badge-soft-dark radius-50 fz-12">{count}</span>
              </h5>


              <div className="d-flex justify-content-end">
                <Button
                  className="add-button"
                  size="large"
                  onClick={() => setShowModal(true)}
                  startIcon={<AddIcon fontSize="small" />}
                  text="Thêm mới  "
                />
              </div>
            </div>
            {/* Table */}
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
                        <div>{item.fullName}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.userEmail}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        <div>{item.userPhone}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none" , textAlign:"center", paddingRight:"40px"}}>
                        <div>{item.roleDto?.roleName}</div>
                      </TableCell>
                      <TableCell sx={{ border: "none"  ,textAlign:"center", paddingRight:"40px"}}>
                        <Switches
                          checked={
                            item.userStatus === "Activate" ? true : false
                          }
                        />
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
      <ModalAdd show={showModal} handleClose={handleClose} />
      <ModalEdit
        show={showEdit}
        handleClose={handleClose}
        employEdit={employEdit}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Employees;
