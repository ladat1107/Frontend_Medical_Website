
import { Modal, Form, Select, message } from 'antd';

import { formatDate } from "@/utils/formatDate";
import { primaryColorAdmin } from '@/style/variables';
import { ROLE } from '@/constant/role';
import { useEffect, useState } from 'react';
import { createSchedule } from '@/services/adminService';

const ScheduleModal = (props) => {
    let date = formatDate(props?.data?.date);
    let roomName = props?.data?.roomName;
    let listStaff = props.departmentId === "2" ? props?.data?.listStaff : props?.data?.listStaff?.roomDepartmentData?.staffDepartmentData
    let listStaffOnSchedule = props?.data?.schedule;
    let [listDoctor, setListDoctor] = useState([]);
    let [listNurse, setListNurse] = useState([]);
    useEffect(() => {
        let _listDoctor = [];
        let _listNurse = [];
        if (listStaff?.length > 0) {
            listStaff?.forEach((staff) => {
                if (staff.staffUserData.roleId === ROLE.DOCTOR) {
                    _listDoctor.push({ label: `${staff.staffUserData.lastName} ${staff.staffUserData.firstName}`, value: staff.staffUserData.id });
                }
                if (staff.staffUserData.roleId === ROLE.NURSE) {
                    _listNurse.push({ label: `${staff.staffUserData.lastName} ${staff.staffUserData.firstName}`, value: staff.staffUserData.id });
                }
            });
            setListDoctor(_listDoctor);
            setListNurse(_listNurse);
        }
    }, [listStaff]);
    useEffect(() => {
        let arrDoctor = [];
        let arrNurse = [];
        if (listStaffOnSchedule?.length > 0) {
            listStaffOnSchedule?.forEach((staff) => {
                if (staff.staffScheduleData.staffUserData.roleId === ROLE.DOCTOR) {
                    arrDoctor.push(staff.staffScheduleData.staffUserData.id);
                }
                if (staff.staffScheduleData.staffUserData.roleId === ROLE.NURSE) {
                    arrNurse.push(staff.staffScheduleData.staffUserData.id);
                }
            });
            form.setFieldsValue({
                doctorId: arrDoctor,
                nurseId: arrNurse
            });
        }
    }, [listStaffOnSchedule]);
    const [form] = Form.useForm();
    const handleAdd = () => {
        form.validateFields().then(async (values) => {
            let data = [];
            values.doctorId.forEach((doctorId) => {
                data.push({
                    roomId: props.data.roomId,
                    date: props.data.date,
                    staffId: doctorId,
                });
            });
            values.nurseId.forEach((nurseId) => {
                data.push({
                    roomId: props.data.roomId,
                    date: props.data.date,
                    staffId: nurseId,
                });
            });
            let response = await createSchedule(data);
            if (response.data.EC === 0) {
                message.success(response.data.EM)
                handleClose();
            } else {
                message.error(response.data.EM)
            }
        }).catch((info) => {
            message.info('Vui lòng chọn bác sĩ và điều dưỡng');
            console.log('Validate Failed:', info);
        });
    };
    const handleClose = () => {
        form.resetFields();
        props.refresh();
    }
    return (
        <Modal
            name="scheduleModal"
            title={<span style={{ color: primaryColorAdmin, fontSize: "1em" }}>Thêm lịch trực</span>}
            open={props.open}
            onCancel={() => handleClose()}
            onOk={() => form.submit()}
            maskClosable={false}
        >
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    doctorId: [],
                    nurseId: []
                }}
                onFinish={() => handleAdd()}>
                <Form.Item className='mt-4' name="roomId">
                    <div><b>{roomName}</b> __ Ngày: {date}</div>
                </Form.Item>
                <Form.Item name="doctorId" label="Bác sĩ">
                    <Select
                        mode="multiple"
                        options={listDoctor} />
                </Form.Item>
                <Form.Item name="nurseId" label="Điều dưỡng">
                    <Select
                        mode="multiple"
                        options={listNurse} />
                </Form.Item>
            </Form>
        </Modal >
    )
}
export default ScheduleModal;