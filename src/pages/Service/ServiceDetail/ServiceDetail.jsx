import React, { useState, useEffect } from "react";
import Header from "./../../../components/Header";
import Button from "./../../../components/filter/Button";
import "./../../../styles/button.scss";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "./../../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "./../../../components/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getDetailServices } from "./../../../features/service/serviceSlide";
import Notification from "./../../../components/Notification";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ModalAddDetail from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import authService from "../../../features/auth/authService";
const headCells = [
  { id: "serviceDetailId", label: "ID" },
  { id: "servicePrice", label: "Giá thành" },
  {
    id: "minNumberOfCarLot",
    label: "Số ghế nhỏ nhất",
    align: "center"
  },
  { id: "maxNumberOfCarLot", label: "Số ghế tối đa" , align: "center"},
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,
    align: "center",
  },
];

const headCellsManager = [
  { id: "serviceDetailId", label: "ID" },
  { id: "servicePrice", label: "Giá thành" },
  {
    id: "minNumberOfCarLot",
    label: "Số ghế nhỏ nhất",
    align: "center",
  },
  { id: "maxNumberOfCarLot", label: "Số ghế tối đa"  , align: "center",},
  
];

const ServiceDetail = () => {
  useEffect(() => {
    document.title = "Chi tiết dịch vụ";
  }, []);
  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[4];
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
  //ADD
  const [showModal, setShowModal] = useState(false);
  const [serAdd, setSerAdd] = useState({});
  const handleAdd = (ser) => {
    setShowModal(true);
    setSerAdd(ser);
  };
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  //EDIT
  const [showEdit, setShowEdit] = useState(false);
  const [serEdit, setSerEdit] = useState({});
  const handleEdit = (ser) => {
    setSerEdit(ser);
    setShowEdit(true);
  };

  // const getData = () => {
  //   // const data = { pageIndex: page + 1, pageSize: rowsPerPage };
  //   dispatch(getDetailServices(id));
  // };
  const serState = useSelector((state) => state.service);
  const { isSuccessAdd, message } = serState;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    dispatch(getDetailServices(id));
    if (isSuccessAdd) {
      setNotify({
        isOpen: true,
        message: "Dịch vụ được được thêm thành công",
        type: "success",
      });
      handleClose();
    } else {
      if (message?.status === 400) {
        setNotify({
          isOpen: true,
          message: "Thất bại",
          type: "error",
        })
      }else if (message.status === 404){
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
      }
    }
  }, [dispatch, id, isSuccessAdd, message?.status, message.title]);
  const serviceInfo = useSelector((state) => state.service.serviceInfo);
  const recordDetail = useSelector((state) => state.service.servicesDetail);
  console.log(recordDetail);
  const count = recordDetail.length;
  console.log(count);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordDetail,
      role === "Admin" ? headCells : headCellsManager,
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
      <div className="md:pt-24 md:px-8">
        <Header
          icon="https://i.imgur.com/1EPVEZN.png"
          size={25}
          alt="services"
          title="Chi tiết dịch vụ"
          number={count}
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="d-flex flex-wrap gap-3 justify-content-between mb-4">
                  <div className="d-flex flex-column gap-3">
                    <h4 className="capitalize font-semibold">
                       ID Dịch vụ: #{id}
                    </h4>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="d-flex align-items-center rounded ">
                        {serviceInfo.serviceName}
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="payment-method d-flex justify-content-sm-end gap-3 capitalize">
                        <span className="title-color">Thời gian tối đa hoàn thành: </span>
                        <div>{serviceInfo.serviceDuration} Giờ</div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="order-status d-flex justify-content-sm-end gap-3 text-capitalize">
                        <span className="title-color">Trạng thái: </span>
                        <span className="font-weight-bold radius-50 d-flex align-items-center px-2 text-sm">
                          <span
                            className={
                              serviceInfo.serviceStatus === "Activate"
                                ? "badge badge-soft-success fz-12"
                                : "badge badge-soft-error fz-12"
                            }
                          >
                            <div>
                              {/* {" "}
                              {item.status === "ACTIVE"
                                ? "Khả dụng"
                                : "Không khả dụng"}{" "} */}
                              {serviceInfo.serviceStatus === "Activate" ? "Khả Dụng" : "Không Khả dụng"}
                            </div>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm-right">
                    <div className="d-flex flex-wrap gap-3">
                      <div>
                        <Button
                          className="add-button"
                          size="large"
                          onClick={() => {
                            navigate(-1);
                          }}
                          startIcon={<KeyboardArrowLeftIcon fontSize="small" />}
                          text="Trở về"
                        />
                      </div>
                      {role === "Admin" ? (
                        <Button
                          className="add-button"
                          size="large"
                          onClick={() => handleAdd(id)}
                          startIcon={<AddIcon fontSize="small" />}
                          text="Add new Service"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
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
                        <TableRow hover key={item.serviceDetailId}>
                          <TableCell
                            sx={{ border: "none", alignContent: "flex-start" }}
                          >
                            <div>{item.serviceDetailId}</div>
                          </TableCell>
                          <TableCell
                            sx={{ border: "none", alignContent: "flex-start" }}
                          >
                            {item.servicePrice}
                          </TableCell>
                          <TableCell sx={{ border: "none" , textAlign:"center", paddingRight:"40px"}}>
                            <div>{item.minNumberOfCarLot}</div>
                          </TableCell>
                          <TableCell sx={{ border: "none" ,  textAlign:"center", paddingRight:"40px"}}>
                            {item.maxNumberOfCarLot}
                          </TableCell>

                          {role === "Admin" ? (
                            <TableCell sx={{ border: "none" }}>
                              <div className="d-flex justify-content-center gap-2">
                                <Tooltip title="Cập nhật" arrow>
                                  <Link
                                    onClick={() => handleEdit(item)}
                                    className="btn btn-outline--primary btn-sm square-btn"
                                  >
                                    <EditIcon fontSize="small" />
                                  </Link>
                                </Tooltip>

                                <Tooltip title="Xóa" arrow>
                                  <Link
                                    className="btn btn-outline-danger btn-sm delete square-btn"
                                    onClick={() => {
                                      setConfirmDialog({
                                        isOpen: true,
                                        title:
                                          "Bạn có chắc chắn muốn thay đổi trạng thái ?",
                                        subTitle:
                                          "Bạn không thể hoàn tác thao tác này",
                                        onConfirm: () => {},
                                      });
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </Link>
                                </Tooltip>
                              </div>
                            </TableCell>
                          ) : (
                            <></>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="text-center">
                            <img
                              src="https://6valley.6amtech.com/public/assets/back-end/svg/illustrations/sorry.svg"
                              alt=""
                              className="mb-3 w-160"
                            />
                            <p>Không có dữ liệu</p>
                          </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </TblContainer>
                <TblPagination />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ModalAddDetail
        show={showModal}
        handleClose={handleClose}
        serAdd={serAdd}
      />
      <ModalEdit show={showEdit} handleClose={handleClose} serEdit={serEdit} />
    </>
  );
};

export default ServiceDetail;
