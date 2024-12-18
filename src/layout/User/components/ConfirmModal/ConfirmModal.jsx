import { message, Modal } from "antd";
import "./ConfirmModal.scss";
import { useEffect, useState } from "react";
import { TABLE, TIMESLOTS } from "@/constant/value";
import userService from "@/services/userService";
import { formatDate } from "@/utils/formatDate";

const ConfirmModal = (props) => {
    let [messageContent, setMessageContent] = useState("")
    let data = props.data;
    const handleClose = () => {
        props.isShow(false)
    }
    useEffect(() => {
        if (props.table === TABLE.EXAMINATION) {
            setMessageContent("Xác nhận xóa lịch hẹn lúc " + TIMESLOTS[data?.time - 1]?.label + " ngày " + formatDate(data?.admissionDate || new Date()) + " ?")
        }
    }, [props.data])
    let handleDelete = async () => {
        if (props.table === TABLE.EXAMINATION) {
            let response = await userService.cancelAppoinment(data);
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
        <Modal
            title="Xác nhận"
            open={props.show}
            onOk={() => handleDelete()}
            onCancel={() => handleClose()}
            okText="Xác nhận"
            cancelText="Đóng"
            maskClosable={false}
        >
            <p> {messageContent}</p>
        </Modal>
    )
}

export default ConfirmModal;