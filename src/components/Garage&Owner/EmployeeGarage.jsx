import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesByGarage } from "../../features/garage/garageSlice";
import useTableV2 from "../table/useTableV2";
import { InputAdornment, TableBody, TableCell, TableRow } from "@mui/material";
import Search from "../filter/Search";
import SearchIcon from "@mui/icons-material/Search";


const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Tên nhân viên" },

  { id: "userEmail", label: "Email" },
  { id: "userPhone", label: "SĐT" },
  { id: "roleName", label: "Vai trò" },
  { id: "userStatus", label: "Trạng thái" },
];
const EmployeeByGarage = () => {
  useEffect(() => {
    document.title = "Danh sách nhân viên garage";
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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getEmployeesByGarage(data));
  }, [page, rowsPerPage]);
  const recordsEmployee = useSelector((state) => state.garage.garages);
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
       20
    );

  return (
    <div className="container-fluid p-0">
      <div className="row gx-2 gx-lg-3">
        <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
          <div className="card">
            {/* Title and search */}
            <div className="px-3 py-4">
              <div className="row align-items-center">
                <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                  <h5 className="text-capitalize d-flex gap-1 font-semibold">
                    Danh sách nhân viên
                    <span className="badge badge-soft-dark radius-50 fz-12">
                      {20}
                    </span>
                  </h5>
                </div>
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <Search
                    label="Tìm kiếm nhân viên"
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
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.roleDto?.roleName}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <span
                            className={
                              item.userStatus === "Activate"
                                ? "badge badge-soft-success fz-12"
                                : "badge badge-soft-danger fz-12"
                            }
                          >
                            {item.userStatus}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
              </div>
             
            </div>
            <div className="table-responsive mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeByGarage;
