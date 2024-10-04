
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { TABLE } from '@/constant/value';
import { message } from "antd";
import { deleteUser, blockUser } from "@/services/adminService";

const CreateUser = (props) => {
    let [messageContent, setMessageContent] = useState("")

    // Khởi tạo useForm
    //let { register, handleSubmit, formState: { errors } } = useForm();

    // Hàm xử lý khi submit thành công
    // const onSubmit = data => {
    //     console.log(data);
    // };
    const handleClose = () => {
        props.isShow(false)
    }
    useEffect(() => {
        if (props.table === TABLE.USER) {
            setMessageContent("Mở")
        }
    }, [props])

    let handleCreateUser = async () => {
        if (props.table === TABLE.USER) {
            // let response = await deleteUser(data);
            // if (response && response.data && response.data.EC === 0) {
            //     message.success(response.data.EM);
            //    
            //     props.refresh()
            // } else {
            //     message.error(response.data.EM);
            // }
            props.isShow(false)
        }
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messageContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => { handleCreateUser() }}>Thêm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateUser;