import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "../../components/filter/Button";
import "../../styles/button.scss";
import Search from "../../components/filter/Search";
import AddIcon from "@mui/icons-material/Add";
import useTableV2 from "../../components/table/useTableV2";
import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Switches from "../../components/table/Switches";
import ConfirmDialog from "../../components/ConfirmDialog";

import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateProductStatus,
  resetState,
} from "../../features/product/productSlice";
import ModalAdd from "./ModalAdd";
import Notification from "./../../components/Notification";
import ModalEdit from "./ModalEdit";
import authService from "../../features/auth/authService";
const headCells = [
  { id: "productId", label: "ID" },
  { id: "productImage", label: "Hình ảnh"  },
  { id: "productName", label: "Tên sản phẩm" },
  { id: "productWarrantyPeriod", label: "Số tháng BH",align: "center", },
  { id: "productPrice", label: "Giá tiền" },
  { id: "productStatus", label: "Trạng thái" },
  {
    id: "action",
    label: "Thao tác",
    disableSorting: true,
    align: "center",
  },
];
const headCellsManager = [
  { id: "productId", label: "ID " },
  { id: "productImage", label: "Hình ảnh", align: "left" },

  { id: "productName", label: "Tên Sản Phẩm" },

  { id: "productPrice", label: "Giá" },
  { id: "productWarrantyPeriod", label: "Sô tháng BH",align: "center", },

  // { id: "productQuantity", label: "Quantity" },
  { id: "productStatus", label: "Trạng thái" },
];

const Products = () => {
  useEffect(() => {
    document.title = "Danh sách sản phẩm";
  }, []);

  const user = authService.getCurrentUser();
  const role = user?.roleName;
  const dispatch = useDispatch();
  const pages = [5, 10, 25]; // page size
  const [page, setPage] = useState(0); // page index
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]); //page size
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  //Add
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowEdit(false);
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [proEdit, setSerEdit] = useState({});
  const handleEdit = (pro) => {
    setSerEdit(pro);
    setShowEdit(true);
  };
  //Call API List
  const proState = useSelector((state) => state.product);
  const { isSuccessAdd, message } = proState;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const updateSuccessAction = useSelector(
    (state) => state.product.isSuccessAction
  );

  const getData = () => {
    const data = { pageIndex: page + 1, pageSize: rowsPerPage };
    dispatch(getProducts(data));
  };
  useEffect(() => {
    getData();
    if (isSuccessAdd) {
      setNotify({
        isOpen: true,
        message: "Sản phẩm được được thêm thành công",
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
  }, [page, rowsPerPage, isSuccessAdd, message, updateSuccessAction]);

  const recordsProduct = useSelector((state) => state.product.products);
  const count = useSelector((state) => state.product.number);

  const handleSwitchToggle = (productId) => {
    dispatch(updateProductStatus(productId));
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTableV2(
      recordsProduct,
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
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://6valley.6amtech.com/public/assets/back-end/img/inhouse-product-list.png"
          alt="products"
          title="Sản phẩm đính kèm "
          number={count}
        />
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
               
                  
                  {role === "Admin" ? (
                    <div className="d-flex justify-content-sm-end">
                      <div>
                        <Button
                          className="add-button"
                          size="large"
                          onClick={() => setShowModal(true)}
                          startIcon={<AddIcon fontSize="small" />}
                          text="Thêm mới sản phẩm"
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                
              </div>

              {/* Table */}
              <div className="table-responsive">
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {recordsAfterPagingAndSorting().map((item) => (
                    <TableRow hover key={item.productId}  sx={{whiteSpace: 'normal',
                    wordBreak: 'break-word',}}>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productId}</div>
                        </TableCell>

                        <TableCell sx={{ border: "none", textAlign: "center" }}>
                          <img
                            className="rounded"
                            src={item.productImage}
                            width={70}
                            alt={"hello"}
                          />
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productName}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none", textAlign:"center", paddingRight:"50px" }}>
                          <div>{item.productWarrantyPeriod}</div>
                        </TableCell>
                        <TableCell sx={{ border: "none" }}>
                          <div>{item.productPrice}</div>
                        </TableCell>
                        {/* <TableCell sx={{ border: "none" }}>
                          <div>{item.productQuantity}</div>
                        </TableCell> */}
                        {role === "Admin" ? (
                          <TableCell sx={{ border: "none" }}>
                            <Switches
                              checked={
                                item.productStatus === "Activate" ? true : false
                              }
                              onChange={(event) => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title:
                                    "Bạn có chắc chắn muốn thay đổi trạng thái?",
                                  subTitle: "Bạn không thể hoàn tác thao tác này",
                                  onConfirm: () => {
                                    handleSwitchToggle(item.productId);
                                  },
                                });
                              }}
                            />
                          </TableCell>
                        ) : (
                          <TableCell sx={{ border: "none" }}>
                            <span
                              className={
                                item.productStatus === "Activate"
                                  ? "badge badge-soft-success fz-12"
                                  : "badge badge-soft-danger fz-12"
                              }
                            >

                              {item.productStatus === "Active" ? "Khả Dụng" : "Không Khả dụng"}

                            </span>
                          </TableCell>
                        )}

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
                            </div>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </TblContainer>
                <TblPagination className="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <ModalAdd show={showModal} handleClose={handleClose} />
      <ModalEdit show={showEdit} handleClose={handleClose} proEdit={proEdit} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Products;
