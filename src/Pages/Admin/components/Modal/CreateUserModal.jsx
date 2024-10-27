
import React, { useEffect, useState } from 'react';
import { GENDER, TABLE } from '@/constant/value';
import { deleteUser, blockUser, getNameDepartment } from "@/services/adminService";
import "./Modal.scss"
import { MESSAGE, REGEX } from '@/constant/validate';
import { ALL_ROLE, STAFF_ROLE } from '@/constant/role';
import removeVietnameseAccent from '@/utils/removeAccent';
import { Checkbox, Form, Input, Select, message, Button, Modal, Col, Row } from 'antd';
import useQuery from '@/hooks/useQuery';
const CreateUser = (props) => {

    let optionPosition = ALL_ROLE;
    let listStaffRole = STAFF_ROLE.map((item) => item.id); // Lấy ra danh sách id của các role của nhân viên

    let [isShowStaff, setIsShowStaff] = useState(false);

    let [messageContent, setMessageContent] = useState("")
    let [departments, setDepartments] = useState([]);

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
    let handlChangePosition = (value) => {
        // setPosition(value);
        if (listStaffRole.includes(value)) {
            setIsShowStaff(true);
        } else {
            setIsShowStaff(false);
        }
        //console.log(value);
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

                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Row key={"normal"} gutter={[16, 8]}>
                            <Col span={6} >
                                <Form.Item
                                    label="Họ"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ của bạn!',
                                        },
                                        {
                                            max: 50,
                                            message: 'Họ không được vượt quá 50 ký tự!',
                                        },
                                        {
                                            pattern: /^[^!@#$%^&*(),.?":{}|<>]*$/,
                                            message: 'Không được chứa ký tự đặc biệt!',
                                        },
                                    ]}
                                >
                                    <Input maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    label="Tên"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên của bạn!',
                                        },
                                        {
                                            max: 50,
                                            message: 'Tên của bạn không được vượt quá 50 ký tự!',
                                        },
                                        {
                                            pattern: /^[^!@#$%^&*(),.?":{}|<>]*$/,
                                            message: 'Không được chứa ký tự đặc biệt!',
                                        },
                                    ]}
                                >
                                    <Input maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            min: 6,
                                            message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                                        }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Xác nhận mật khẩu"
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng xác nhận mật khẩu!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ!',
                                        },
                                    ]}
                                >
                                    <Input type='email' />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            len: 10,
                                            message: 'Số điện thoại phải đúng 10 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    label="Căn cước công dân"
                                    name="cid"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập căn cước công dân!',
                                        },
                                        {
                                            len: 12,
                                            message: 'Căn cước công dân phải có 12 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    name="position"
                                    label="Vai trò"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Vui lòng chọn vai trò"
                                        showSearch
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        onChange={(value) => handlChangePosition(value)}
                                        options={optionPosition}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {isShowStaff && <Row gutter={[16, 8]}>
                            <Col span={6} >
                                <Form.Item
                                    name="department"
                                    label="Phòng ban"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        placeholder="Vui lòng chọn phòng ban"
                                        options={departments}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>}

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