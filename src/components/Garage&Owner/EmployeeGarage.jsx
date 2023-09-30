import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesByGarage } from "../../features/garage/garageSlice";
import useTableV2 from "../table/useTableV2";
import { InputAdornment, TableBody, TableCell, TableRow } from "@mui/material";
import Search from "../filter/Search";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

const headCells = [
  { id: "userId", label: "ID" },
  { id: "fullName", label: "Tên nhân viên" },

  { id: "userEmail", label: "Email" },
  { id: "userPhone", label: "SĐT" },
  { id: "roleName", label: "Vai trò" },
  { id: "mechanicLevel", label: "Cấp Bậc" },
  { id: "mechanicStatus", label: "Trạng thái" },
];
const EmployeeByGarage = () => {
  useEffect(() => {
    document.title = "Danh sách nhân viên garage";
  }, []);
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };

    dispatch(getEmployeesByGarage({ ...data, id }));
  }, [page, rowsPerPage, id]);
  const recordsEmployee = useSelector((state) => state.garage.garages);
  const count = useSelector((state) => state.garage.number);
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
                      {count}
                    </span>
                  </h5>
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
                          <div>{item.mechanicLevel}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
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
