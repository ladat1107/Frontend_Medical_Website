
import React, { useEffect, useState } from 'react';
import { GENDER, POSITION, TABLE } from '@/constant/value';
import { getNameDepartment, createUser } from "@/services/adminService";
import "./Modal.scss";
import { ALL_ROLE, STAFF_ROLE } from '@/constant/role';
import { Form, Input, Select, message, Button, Modal, Col, Row, InputNumber } from 'antd';
import useQuery from '@/hooks/useQuery';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
let mdParser = new MarkdownIt(/* Markdown-it options */);
const CreateUser = (props) => {

    let optionPosition = POSITION;
    let optionRole = ALL_ROLE;
    let listStaffRole = STAFF_ROLE.map((item) => item.id); // Lấy ra danh sách id của các role của nhân viên
    let [form] = Form.useForm();
    const [markdownValue, setMarkdownValue] = useState("");
    let htmlContent = "";
    let [isShowStaff, setIsShowStaff] = useState(false);
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
    const handleModalSubmit = async () => {
        form
            .validateFields()
            .then(async (values) => {
                let response = await createUser({ ...values, htmlContent });
                if (response?.data?.EC === 0) {
                    message.success("Thêm người dùng thành công!");
                    handleClose();
                    props.refresh();
                } else {
                    message.error(response?.data?.EM || "Thêm người dùng thất bại!");
                }

            })
            .catch((errorInfo) => {
                onFinishFailed(errorInfo); // Gọi onFinishFailed khi form không hợp lệ
            });
    };
    const handleClose = () => {
        form.resetFields()
        setMarkdownValue("")
        props.isShow(false)
    }

    useEffect(() => {
        if (props.table === TABLE.USER) {
            // setMessageContent("Mở")
        }
    }, [props])

    let handlChangeRole = (value) => {
        // setPosition(value);
        if (listStaffRole.includes(value)) {
            setIsShowStaff(true);
        } else {
            setIsShowStaff(false);
        }
        //console.log(value);
    }
    let handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };
    // Finish!
    let handleEditorChange = ({ html, text }) => {
        setMarkdownValue(text);
        htmlContent = html;
        form.setFieldsValue({ markDownContent: text }); // Cập nhật giá trị cho Form.Item
    };
    return (
        <>
            <div className='create-modal'>
                <Modal
                    title="Thêm người dùng mới"
                    centered
                    open={props.show}
                    onCancel={() => handleClose()}
                    maskClosable={false} // Ngăn đóng modal khi bấm bên ngoài
                    footer={[
                        <Button key="cancel" onClick={() => handleClose()}>
                            Hủy
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => handleModalSubmit()}>
                            Thêm mới
                        </Button>,
                    ]}
                    width={"80vw"}
                >
                    <Form
                        form={form}
                        name="insertUser"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}

                        initialValues={{
                            remember: true,
                            position: [],
                            markDownContent: markdownValue,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
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
                                            pattern: /^[^!@#$%^&*(),.?":{}|<>]*$/,
                                            max: 50,
                                            message: 'Không được chứa ký tự đặc biệt và không được vượt quá 50 ký tự!',
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
                                            pattern: /^[^!@#$%^&*(),.?":{}|<>]*$/,
                                            message: 'Không được chứa ký tự đặc biệt và không được vượt quá 50 ký tự!',
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
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
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
                                            required: true,
                                            message: 'Vui lòng nhập email!',
                                        },
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
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại!',
                                        }
                                        , {
                                            pattern: /^\d{10}$/,
                                            message: 'Số điện thoại phải đúng 10 ký tự!',
                                        }
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
                                            pattern: /^\d{12}$/,
                                            message: 'Căn cước công dân phải có 12 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input type='number' />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    name="roleId"
                                    label="Vai trò"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn vai trò!',
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
                                        onChange={(value) => handlChangeRole(value)}
                                        options={optionRole}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {isShowStaff && <Row gutter={[16, 8]}>
                            <Col span={6} >
                                <Form.Item
                                    name="departmentId"
                                    label="Phòng ban"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn phòng ban!',
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
                            <Col span={6} >
                                <Form.Item
                                    name="position"
                                    label="Chức vụ"
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Vui lòng chọn chức vụ"
                                        options={optionPosition}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item
                                    name="price"
                                    label="Giá khám"
                                    rules={[{
                                        pattern: /^[0-9]*$/,
                                        message: 'Giá khám không hợp lệ!',

                                    }]
                                    }
                                >
                                    <InputNumber suffix="VNĐ" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={24} >
                                <Form.Item
                                    name={"markDownContent"}
                                    label="Mô tả"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mô tả!',
                                        },
                                    ]}
                                >
                                    <MdEditor style={{
                                        minHeight: '230px',
                                    }}
                                        value={markdownValue}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={handleEditorChange} />
                                </Form.Item>
                            </Col>

                        </Row>}

                    </Form>
                </Modal>
            </div >

        </>
    );
};

export default CreateUser;