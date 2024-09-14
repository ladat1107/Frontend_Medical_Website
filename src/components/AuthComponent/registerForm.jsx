import { useAuthenContext } from "@/contexts/AuthenContext";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RegisterForm = () => {
  const { handleModalClose, showModal } = useAuthenContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();

  const _onSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập tại đây (Ví dụ: gọi API)
    console.log("Email:", email);
    console.log("Password:", password);
    handleModalClose(); // Đóng modal sau khi đăng nhập
  };

  return (
    <>
      <Modal show={!!showModal}>
        <Modal.Header closeButton onClick={handleModalClose}>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={() => {
              console.log("login");
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                value={phone}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={_onSubmit}
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterForm;
