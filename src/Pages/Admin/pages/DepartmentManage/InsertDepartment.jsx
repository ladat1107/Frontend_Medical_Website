import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Progress, Radio, Row, Select, Upload } from 'antd';
import { CloudUploadOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { createDepartment, getStaffByRole, updateDepartment } from '@/services/adminService';
import useQuery from '@/hooks/useQuery';
import uploadToCloudinary from '@/utils/uploadToCloudinary';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STATUS } from '@/constant/value';

const InsertDepartment = (props) => {
    const [form] = Form.useForm();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(""); // Lưu trữ URL ảnh sau khi upload
    let [listDoctors, setListDoctors] = useState([]);
    let { data: doctors } = useQuery(() => getStaffByRole(3))
    let mdParser = new MarkdownIt(/* Markdown-it options */);
    const [markdownValue, setMarkdownValue] = useState("");
    let [col, setCol] = useState(8);
    let htmlContent = markdownValue;
    let [departmentUpdate, setDepartmentUpdate] = useState(props.obUpdate);
    useEffect(() => {
        if (doctors && doctors?.DT?.length > 0) {
            let _doctor = doctors.DT.map((item) => {
                return {
                    value: item.id,
                    label: item?.staffUserData?.lastName + ' ' + item?.staffUserData?.firstName
                }
            })
            setListDoctors(_doctor);
        }
    }, [doctors])
    useEffect(() => {
        if (departmentUpdate.id) {
            setDepartmentUpdate(props.obUpdate);
            form.setFieldsValue({
                name: departmentUpdate?.name || "",
                address: departmentUpdate?.address || "",
                deanId: departmentUpdate?.deanId || null,
                status: departmentUpdate?.status || 1,
                image: departmentUpdate.image,
                htmlContent: departmentUpdate?.departmentDescriptionData?.htmlContent || markDownContent,
                markDownContent: departmentUpdate?.departmentDescriptionData?.markDownContent || ""
            })
            setMarkdownValue(departmentUpdate?.departmentDescriptionData?.markDownContent || "");
            setImageUrl(departmentUpdate?.image || "");
            setCol(6);
        }
    }, [props.obUpdate])
    let handleCloseInsert = () => {
        form.resetFields()
        props.handleShowInsert(false)
    }

    // Xử lý khi người dùng chọn ảnh
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true); // Bắt đầu upload
        setUploadProgress(0); // Đặt lại tiến trình về 0

        try {
            // Gọi hàm upload với callback để cập nhật tiến trình
            const url = await uploadToCloudinary(file, (progress) => {
                setUploadProgress(progress);
            });
            setImageUrl(url); // Lưu URL ảnh sau khi upload
            message.success("Upload thành công!");
        } catch (error) {
            message.error("Upload thất bại. Vui lòng thử lại.");
            console.error(error);
        } finally {
            setUploading(false); // Kết thúc upload
        }
    };
    let handleInsert = () => {
        if (!imageUrl) {
            message.error('Vui lòng chọn ảnh khoa!')
        }
        form.validateFields().then(async (values) => {
            let respone;
            if (departmentUpdate.id) {
                respone = await updateDepartment({ ...values, image: imageUrl, htmlContent, id: departmentUpdate.id })
            } else {
                respone = await createDepartment({ ...values, image: imageUrl, htmlContent })
            }
            if (respone?.data?.EC == 0) {
                message.success(respone?.data?.EM || "Thành công")
                setMarkdownValue("");
                setImageUrl("");
                handleCloseInsert();
                props.refresh();
            }
            else {
                message.error(respone?.data?.EM || "Thêm khoa thất bại")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    // Finish!
    let handleEditorChange = ({ html, text }) => {
        setMarkdownValue(text);
        htmlContent = html;
        form.setFieldsValue({ markDownContent: text }); // Cập nhật giá trị cho Form.Item
    };
    return (
        <div className="insert-department">
            <div className="content px-3 py-3">
                <div className='d-flex justify-content-between align-items-center'>
                    <div >{departmentUpdate ? "CẬP NHẬT KHOA" : "THÊM KHOA"}</div>
                    <FontAwesomeIcon className='icon'
                        onClick={() => { handleCloseInsert() }}
                        icon={faXmark} size="xl" />
                </div>
                <hr />
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
                                    label="Tên khoa"
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng nhập tên khoa!',
                                    }]}>
                                    <Input placeholder="Nhập tên khoa" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} lg={col}>
                                <Form.Item
                                    name={"address"}
                                    label="Địa điểm"
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng nhập địa điểm của khoa!',
                                    }]}>

                                    <Input placeholder="Nhập vị trí của khoa" />
                                </Form.Item>
                            </Col>
                            <Col sm={24} lg={col}>
                                <Form.Item
                                    name="deanId"
                                    label="Trưởng khoa"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn trưởng khoa!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Chọn trưởng khoa"
                                        showSearch
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={listDoctors}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                            {departmentUpdate.id &&
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
                            }
                            <Col sm={24} lg={8}>
                                <Form.Item
                                    name={"image"}
                                    label="Ảnh khoa"

                                >
                                    <div className='image-upload'>
                                        <div className='container'>
                                            <span><CloudUploadOutlined /></span>
                                            <div><span htmlFor={"input-upload"}
                                                onClick={() => document.getElementById('input-upload').click()}>Chọn ảnh</span> đăng tải.</div>
                                            {uploading && (
                                                <div style={{ marginTop: '20px', width: '100%' }}>
                                                    <Progress percent={uploadProgress} status="active" />
                                                </div>
                                            )}
                                            {imageUrl && (
                                                <div>
                                                    <img src={imageUrl} alt="Uploaded" style={{ width: "300px", borderRadius: "10px" }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <input type="file" id='input-upload' hidden={true} onChange={handleImageChange} />
                                </Form.Item>

                            </Col>
                            <Col sm={24} lg={16}>
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
                                        minHeight: '280px',
                                        borderRadius: '10px',
                                        padding: "5px",
                                    }}
                                        value={markdownValue}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={handleEditorChange} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                <Form.Item>
                                    <Button type="primary" htmlType="submit"
                                        onClick={() => { handleInsert() }}>{departmentUpdate.id ? "Cập nhật" : "Thêm"}</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>


        </div >
    )
}

export default InsertDepartment;