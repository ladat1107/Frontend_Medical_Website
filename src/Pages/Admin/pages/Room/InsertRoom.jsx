import useQuery from "@/hooks/useQuery";
import { createRoom, getNameDepartment, getServiceSearch } from "@/services/adminService";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";

const InsertRoom = (props) => {
    let [form] = Form.useForm();
    let [departmentChoose, setDepartmentChoose] = useState(null);
    let col = 8;
    let [departments, setDepartments] = useState([]);
    let [services, setServices] = useState([]);
    let { data: departmentData } = useQuery(() => getNameDepartment())
    let { data: serviceData } = useQuery(() => getServiceSearch())
    useEffect(() => {
        if (departmentData && departmentData?.DT?.length > 0) {
            setDepartments(departmentData.DT);
        }
    }, [departmentData])
    useEffect(() => {
        if (serviceData && serviceData?.DT?.length > 0) {
            setServices(serviceData.DT);
        }
    }, [serviceData])
    let handleInsert = () => {
        form.validateFields().then(async (values) => {
            let reponse = await createRoom({ ...values, bedQuantity: values.bedQuantity + "" });
            if (reponse?.data?.EC === 0) {
                message.success(reponse.data.EM || "Thêm phòng thành công");
                form.resetFields();
            }
            else {
                message.error(reponse.data.EM || "Thêm phòng thất bại");
            }
        }).catch((error) => {
            console.log("error,", error)
        })
    }
    let handleCloseInsert = () => {
        form.resetFields()
        props.handleShowInsert(false)
    }
    return (
        <div className="insert-room-content">
            <div className="container">
                <div className="first d-flex justify-content-between align-items-center py-3">
                    <div className="text mt-3">THÊM PHÒNG</div>
                    <FontAwesomeIcon className='icon'
                        onClick={() => { handleCloseInsert() }}
                        icon={faXmark} size="xl" />
                </div>


                <div className="mt-3">
                    <Form
                        layout={'horizontal'}
                        form={form}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{

                        }}
                        style={{
                            maxWidth: "100%",
                        }}
                    >
                        <Row gutter={[16, 8]}>
                            <Col sm={24} lg={col}>
                                <Form.Item
                                    name={"name"}
                                    label="Tên phòng"
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng nhập tên phòng!',
                                    }]}>
                                    <Input placeholder="Nhập tên khoa" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} lg={col}>
                                <Form.Item
                                    name={"bedQuantity"}
                                    label="Số lượng giường"
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng nhập số lượng giường!',
                                    },
                                    {
                                        pattern: /^[0-9]*$/g,
                                        message: 'Vui lòng nhập số!',
                                    }]}>

                                    <Input placeholder="Nhập số lượng giường" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} lg={col}>
                                <Form.Item
                                    name="departmentId"
                                    label="Khoa"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn khoa!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Chọn khoa"
                                        showSearch
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        onChange={(value) => { setDepartmentChoose(value) }}
                                        options={departments}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col sm={24} lg={col}>
                                <Form.Item
                                    name="serviceIds"
                                    label="Các dịch vụ của phòng"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn loại dịch vụ!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Chọn dịch vụ"
                                        showSearch
                                        mode="multiple"
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={services}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                            {
                                departmentChoose === 2 &&
                                <Col xs={24} lg={col}>
                                    <Form.Item
                                        name="medicalExamination"
                                        label="Chọn chuyên khoa"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn chuyên khoa!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Chọn chuyên khoa"
                                            showSearch
                                            optionFilterProp="label"
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={departments}
                                        >
                                        </Select>
                                    </Form.Item>
                                </Col>
                            }
                            {/* {departmentUpdate.id &&
                                <Col sm={24} lg={col}>
                                    <Form.Item
                                        name={"status"}
                                        label="Tình trạng"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn tình trạng!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Chọn tình trạng"
                                            options={STATUS}
                                        >
                                        </Select>
                                    </Form.Item></Col>
                            } */}
                            <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                <Form.Item>
                                    <Button type="primary" htmlType="submit"
                                        style={{ background: "#03989e" }}
                                        onClick={() => { handleInsert() }}>Thêm</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default InsertRoom;