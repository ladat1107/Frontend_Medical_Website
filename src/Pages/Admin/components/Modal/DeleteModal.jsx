import { TABLE } from '@/constant/value';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser, blockUser, deleteDepartment, blockDepartment } from "@/services/adminService";
import { message } from "antd";
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
            setMessageContent("Xác nhận xóa phòng ban " + data.name + "?")

        }
    }, [props.data])
    let handleDelete = async () => {
        if (props.table === TABLE.USER) {
            let response = await deleteUser(data);
            if (response && response.data && response.data.EC === 0) {
                message.success(response.data.EM);
                props.isShow(false)
                props.refresh()
            } else {
                message.error(response.data.EM);
            }
        }
        else if (props.table === TABLE.DEPARTMENT) {
            let response = await deleteDepartment(data);
            if (response && response.data && response.data.EC === 0) {
                message.success(response.data.EM);
                props.isShow(false)
                props.refresh()
            } else {
                message.error(response.data.EM);
            }
        }
    }
    let handleLock = async () => {
        if (props.table === TABLE.USER) {
            let response = await blockUser(data);
            if (response && response.data && response.data.EC === 0) {
                message.success(response.data.EM);
                props.isShow(false)
                props.refresh()
            } else {
                message.error(response.data.EM);
            }
        }
        else if (props.table === TABLE.DEPARTMENT) {
            let response = await blockDepartment(data);
            if (response && response.data && response.data.EC === 0) {
                message.success(response.data.EM);
                props.isShow(false)
                props.refresh()
            } else {
                message.error(response.data.EM);
            }

        }
    }
    return (
        <>
            <Modal
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
            </Modal>
        </>
    );
};

export default DeleteModal;