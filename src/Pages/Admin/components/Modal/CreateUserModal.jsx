
import React, { useEffect, useState } from 'react';
import { GENDER, TABLE } from '@/constant/value';
import { deleteUser, blockUser, getNameDepartment } from "@/services/adminService";
import "./Modal.scss"
import { MESSAGE, REGEX } from '@/constant/validate';
import { ALL_ROLE } from '@/constant/role';
import removeVietnameseAccent from '@/utils/removeAccent';
import { Checkbox, Form, Input, Select, message, Button, Modal } from 'antd';
import useQuery from '@/hooks/useQuery';
const CreateUser = (props) => {

    let [messageContent, setMessageContent] = useState("")
    let [position, setPosition] = useState(0);
    let [departments, setDepartments] = useState([]);

    let optionPosition = ALL_ROLE;

    let { data: departmentData } = useQuery(() => getNameDepartment())
    useEffect(() => {
        if (departmentData && departmentData?.DT?.length > 0) {
            setDepartments(departmentData.DT);
        }
    }, [departmentData])


    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Hàm xử lý khi submit thành công
    const onSubmit = (data) => {
        console.log("data");
        console.log("data", data);

    };
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
            <div className='create-modal'>
                <Modal
                    title="Thêm người dùng mới"
                    centered
                    open={props.show}
                    onOk={() => handleCreateUser()}
                    onCancel={() => props.isShow(false)}
                    width={"90vw"}
                >
                    <Form
                        name="basic"

                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div >

        </>
    );
};

export default CreateUser;