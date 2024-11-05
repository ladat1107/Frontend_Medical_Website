import useQuery from "@/hooks/useQuery";
import { getNameDepartment, getServiceSearch } from "@/services/adminService";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const InsertRoom = () => {
    let [form] = Form.useForm();
    let col = 8;
    let [departments, setDepartments] = useState([]);
    let [services, setServices] = useState([]);
    let { data: departmentData } = useQuery(() => getNameDepartment())
    let { data: serviceData } = useQuery(() => getServiceSearch(""))
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

    const handleServiceSearch = async (value) => {
        const response = await getServiceSearch(value);
        if (response?.data.EC === 0) {
            setServices(response.data.DT);
        }
    };
    let handleInsert = () => {

    }
    console.log(services)
    return (
        <div className="insert-room-content">
            <div className="container">
                <div className="text mt-3">THÊM PHÒNG</div>

                <div>
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
                                        onSearch={handleServiceSearch}
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={services}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
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