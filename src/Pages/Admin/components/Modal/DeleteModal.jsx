import { TABLE } from '@/constant/value';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { deleteUser, blockUser, deleteDepartment, blockDepartment, deleteServiceOfRoom, blockServiceOfRoom, deleteRoom, blockRoom } from "@/services/adminService";
import { Button, message, Modal } from "antd";
const DeleteModal = (props) => {
    let [messageContent, setMessageContent] = useState("")
    let data = props.data;
    const handleClose = () => {
        props.isShow(false)
    }
    useEffect(() => {
        if (props.table === TABLE.USER) {
            setMessageContent("Xác nhận xóa người dùng " + data.lastName + " " + data.firstName + "?")
        } else if (props.table === TABLE.DEPARTMENT) {
            setMessageContent("Xác nhận xóa khoa " + data.name + "?")
        } else if (props.table === TABLE.SERVICE) {
            setMessageContent("Xác nhận xóa " + data.name + "?")
        } else if (props.table === TABLE.ROOM) {
            setMessageContent("Xác nhận xóa phòng " + data.name + "?")
        }
    }, [props.data])
    let handleDelete = async () => {
        if (props.table === TABLE.USER) {
            let response = await deleteUser(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        }
        else if (props.table === TABLE.DEPARTMENT) {
            let response = await deleteDepartment(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        }
        else if (props.table === TABLE.SERVICE) {
            let response = await deleteServiceOfRoom(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        } else if (props.table === TABLE.ROOM) {
            let response = await deleteRoom(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        }
    }
    let handleLock = async () => {
        if (props.table === TABLE.USER) {
            let response = await blockUser(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        }
        else if (props.table === TABLE.DEPARTMENT) {
            let response = await blockDepartment(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }

        } else if (props.table === TABLE.SERVICE) {
            let response = await blockServiceOfRoom(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        } else if (props.table === TABLE.ROOM) {
            let response = await blockRoom(data);
            if (response && response.data && response.data.EC === 0) {
                susscess(response?.data?.EM || "Thành công")
            } else {
                message.error(response.data.EM);
            }
        }
    }
    let susscess = (text) => {
        message.success(text);
        props.isShow(false)
        props.refresh()
    }
    return (
        <>
            <Modal
                title={"Xác nhận"}
                open={props.show}
                onCancel={handleClose}
                maskClosable={false} // Ngăn đóng modal khi bấm bên ngoài
                footer={[
                    <Button key="cancel" onClick={() => handleClose()}>
                        Hủy
                    </Button>,
                    <Button key="submit" style={{ background: "#003a8c", color: "#ffffff", border: "none" }} onClick={() => handleLock()}>
                        Khóa
                    </Button>,
                    <Button key="submit" style={{ background: "#f5222d", color: "#ffffff", border: "none" }} onClick={() => handleDelete()}>
                        Xóa
                    </Button>,
                ]}
            >
                <p> {messageContent}</p>

            </Modal>
            {/* <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÁC NHẬN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messageContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="warning" onClick={() => { handleLock() }}>
                        Khóa
                    </Button>
                    <Button variant="danger" onClick={() => { handleDelete() }}>Xóa</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
};

export default DeleteModal;