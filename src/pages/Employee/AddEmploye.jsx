import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addEmployees,
  getEmployees,
} from "./../../features/employee/employeeSlice";
const phoneRegExp = /^[0-9\- ]{8,14}$/;
const schema = yup
  .object({
    userFirstName: yup
      .string()
      .required("Không để trống tên của nhân viên !!!")
      .min(1, "Tên của nhân viên quá ngắn !")
      .max(25, "Tên của nhân viên quá dài!"),
    userLastName: yup
      .string()
      .required("Không để trống họ và tên đệm của nhân viên !!!")
      .min(1, "Họ và tên đệm quá ngắn !")
      .max(25, "Họ và tên đệm quá dài !"),
    userEmail: yup
      .string()
      .email("Email không hợp lệ !")
      .required("Không được để trống email !!!"),
    userPhone: yup
      .string()
      .matches(phoneRegExp, "Số điện thoại không hợp lệ !!!")
      .required("Không để trống số điện thoại !!!")
      .max(10, "Số điện thoại quá dài !"),
    userPassword: yup
      .string()
      .required("Không để trống mật khẩu !!!")
      .min(1, "Mật khẩu quá ngắn !")
      .max(25, "Mật khẩu quá dài !"),
    passwordConfirm: yup
      .string()
      .required("Không để trống xác nhận mật khẩu !!!")
      .oneOf(
        [yup.ref("userPassword")],
        "Mật khẩu xác nhận không khớp với mặt khẩu đã nhập ! "
      ),
  })
  .required();
function ModalAdd(props) {
  const dispatch = useDispatch();
  const { show, handleClose } = props;
  const [roleId, setRole] = useState("");
  const onHandleSubmit = (data) => {
    const user = {
      roleId,
      userFirstName: data.userFirstName,
      userLastName: data.userLastName,
      userPhone: data.userPhone,
      userEmail: data.userEmail,
      userPassword: data.userPassword,
      passwordConfirm: data.passwordConfirm,
    };
    console.log(user);
    dispatch(addEmployees(user))
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      userFirstName: "",
      userLastName: "",
      userPhone: "",
      userEmail: "",
      userPassword: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const roleUser = user?.roleName;
  useEffect(() => {
    if (roleUser === "Admin") {
      setRole(2);
    } else {
      setRole(5);
    }
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset, roleUser]);
  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới nhân viên</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onHandleSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3" hidden={true}>
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="roleId"
                value={roleId}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Tên đệm của nhân viên <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  name="userFirstName"
                  {...register("userFirstName")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.userFirstName?.message}
                </p>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Tên của nhân viên <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  name="userLastName"
                  {...register("userLastName")}
                />
                <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                  {errors.userLastName?.message}
                </p>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>
                Email của nhân viên <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="userEmail"
                {...register("userEmail")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.userEmail?.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                SĐT của nhân viên <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="userPhone"
                {...register("userPhone")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.userPhone?.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Mật khẩu của nhân viên <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="userPassword"
                {...register("userPassword")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.userPassword?.message}
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Xác nhân mật khẩu <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="passwordConfirm"
                {...register("passwordConfirm")}
              />
              <p role="alert" style={{ color: "red", marginTop: "5px" }}>
                {errors.passwordConfirm?.message}
              </p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="success" type="submit" style={{ color: "black" }}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAdd;
