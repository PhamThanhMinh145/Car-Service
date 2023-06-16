import React, { useState } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "../../components/filter/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Select from "../../components/filter/Select";
import DateTime from "../../components/filter/DateTime";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import useTable from "../../components/table/useTable";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
const headCells = [
  { id: "id", label: "ID" },
  { id: "order", label: "Order ID" },
  { id: "date", label: "Order Date" },
  { id: "info", label: "Customer Info" },

  { id: "garage", label: "Garage" },
  { id: "total", label: "Total Amount", align: "right" },
  { id: "status", label: "Order Status", align: "center" },
  {
    id: "action",
    label: "Action",
    disableSorting: true,

    align: "center",
  },
];
const Confirm = () => {
  const rows = [
    {
      id: 1,
      order: 1020392,
      date: new Date().toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      info: {
        name: "Min Min",
        phone: "081233423432",
      },
      garare: "Auto Garage",
      total: {
        price: "5.000.000",
        status: "Paid",
      },
      status: "Confirmed",
    },
  ];
  const [age, setAge] = React.useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(rows, headCells, filterFn);
  return (
    <div className="min-[620px]:pt-24 min-[620px]:px-8">
      <Header
        icon="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
        size={20}
        alt="all"
        title="Confirmed Orders"
        number="8"
      />

      <div className="card">
        {/* Filter */}
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row gy-3 gx-2">
                <div className="col-12 pb-0">
                  <h4 className="font-semibold">Select Date Range</h4>
                </div>
                <div className="col-sm-6 col-md-3">
                  <Select title={"All"} value={age} onChange={handleChange} />
                </div>
                <div className="col-sm-6 col-md-3">
                  <DateTime label={"Start Date"} />
                </div>
                <div className="col-sm-6 col-md-3 mt-2 mt-sm-0">
                  <DateTime label={"End Date"} />
                </div>
                <div className="col-sm-6 col-md-3 mt-2 mt-sm-0">
                  <Button
                    sx={{ height: "54.56px" }}
                    className="add-button"
                    size="large"
                    onClick={() => {}}
                    fullWidth
                    text="Show Data"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="card-body">
          {/* Search and export */}
          <div className="px-3 py-4 light-bg">
            <div className="row g-2 flex-grow-1">
              <div className="col-sm-8 col-md-6 col-lg-4">
                <Search
                  label="Search by Order ID"
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
              <div className="col-sm-4 col-md-6 col-lg-8 d-flex justify-content-sm-end">
                <Button
                  variant="outlined"
                  className="export-button"
                  size="large"
                  onClick={() => {}}
                  startIcon={<FileDownloadIcon fontSize="small" />}
                  text="Export"
                />
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="table-responsive">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.id}</div>
                    </TableCell>

                    <TableCell sx={{ border: "none" }}>
                      <Link
                        to={`/admin/orders/details/${item.order}`}
                        className="title-color hover-c1"
                      >
                        {item.order}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div>{item.date}</div>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Link
                        to={`/admin/customer/view/${"1"}`}
                        className="text-body text-capitalize"
                      >
                        <strong>{item.info.name}</strong>
                      </Link>
                      <Link
                        to={`tel:${item.info.phone}`}
                        className="d-block title-color"
                      >
                        {item.info.phone}
                      </Link>
                    </TableCell>

                    <TableCell sx={{ border: "none" }}>
                      <div>{item.garare}</div>
                    </TableCell>

                    <TableCell sx={{ border: "none", textAlign: "right" }}>
                      <div>{item.total.price}</div>
                      <span className="badge text-success fz-12 px-0">
                        {item.total.status}
                      </span>
                    </TableCell>

                    <TableCell
                      sx={{
                        border: "none",
                        textDecoration: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      <span className="badge badge-soft-success fz-12">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <div className="d-flex justify-content-center gap-2">
                        <Tooltip title="view" arrow>
                          <Link
                            to={`/admin/orders/details/${item.order}`}
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
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination className="pagination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
