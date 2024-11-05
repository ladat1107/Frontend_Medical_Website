import { createServiceOfRoom, getServiceById, getServiceOfRoom, updateServiceOfRoom } from "@/services/adminService";
import "./ServiceOfRoom.scss";
import { useMutation } from "@/hooks/useMutation";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCircle, faPencil, faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import DropdownPaginate from "../../components/Dropdown/DropdownPaginate";
import PaginateCustom from "../../components/Paginate/PaginateCustom";
import { Button, Checkbox, Col, Form, Input, InputNumber, message, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import DeleteModal from "../../components/Modal/DeleteModal";
import { STATUS, TABLE } from "@/constant/value";
import { formatCurrency } from "@/utils/formatCurrency";
const { TextArea } = Input;
const ServiceOfRoom = () => {
    let [form] = Form.useForm();
    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);
    let [rowsPerPage, setRowPaper] = useState({ value: 10, id: 1 });
    let [totalPages, setTotalPage] = useState(0);
    let [listServiceType, setListServiceType] = useState([]);
    let [checkAll, setCheckAll] = useState(false);
    let [search, setSearch] = useState("");
    let [obDelete, setObDelete] = useState({});
    let [obUpdate, setObUpdate] = useState(null);
    let searchDebounce = "";
    let {
        data: dataServiceType,
        loading: listServiceTypeLoading,
        error: listServiceTypeError,
        execute: fetchServiceTypes,
    } = useMutation((query) =>
        getServiceOfRoom(currentPage, rowsPerPage.id, searchDebounce)
    )
    useEffect(() => {
        if (dataServiceType && dataServiceType.DT && dataServiceType.DT.rows && dataServiceType.DT) {
            let _listServiceType = [...dataServiceType.DT.rows];
            for (let i = 0; i < _listServiceType.length; i++) {
                _listServiceType[i].checked = false;
            }
            setListServiceType(_listServiceType);
            setTotalPage(dataServiceType.DT.count / rowsPerPage.value);
        }
    }, [dataServiceType])

    useEffect(() => {
        fetchServiceTypes();
    }, [currentPage, useDebounce(search, 500), rowsPerPage]);
    useEffect(() => {
        if (obUpdate && obUpdate.id) {
            form.setFieldsValue({
                name: obUpdate.name,
                price: obUpdate.price,
                description: obUpdate.description,
                status: obUpdate.status
            })
        }
    }, [obUpdate]);
    let handleChange = (item, index) => {
        let _listService = [...listServiceType];
        _listService = _listService.map(obj =>
            obj.id === item.id ? { ...obj, checked: !item.checked } : obj
        );
        setListServiceType(_listService);
    };
    let handleChangeSelectedAll = () => {
        let _listService = [...listServiceType];
        setCheckAll(!checkAll);
        _listService = _listService.map(obj =>
            checkAll === true ? { ...obj, checked: false } : { ...obj, checked: true }
        );
        setListServiceType(_listService);
    }
    let handleChangePaginate = (item) => {
        setRowPaper(item);
        setCurrentPage(1);
    }
    searchDebounce = useDebounce(search, 500);
    let handleChangeSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1)
    }
    let refresh = () => {
        fetchServiceTypes();
        setObUpdate(null);
    }
    let handleDelete = (item) => {
        setObDelete({ ...item })
        setShowDeleteModal(true)
    }
    let handleShow = (value) => {
        setShowDeleteModal(value)
    }
    let handleUpdate = async (item) => {
        let reponse = await getServiceById(item.id);
        if (reponse?.data?.EC == 0) {
            let value = reponse?.data?.DT;
            setObUpdate(value)
        } else {
            message.error(reponse?.data?.EM || "Không thể chọn dịch vụ")
            refresh();
        }
    }
    let handleInsertUpdate = async () => {
        form.validateFields().then(async (values) => {
            let response = null;
            if (obUpdate) {
                response = await updateServiceOfRoom({ ...values, id: obUpdate.id })
            } else {
                response = await createServiceOfRoom(values)
            }
            if (response?.data?.EC === 0) {
                message.success(response?.data?.EM || "Thành công");
                form.resetFields();
                setObUpdate(null);
                refresh();
            } else {
                message.error(response?.data?.EM || "Thất bại")
            }
        }).catch((error) => {
            console.log("error", error)
        });

    }
    return (
        < div className="service-of-room-content" >
            <div className="container">
                <div className="service-of-room-content-header d-flex align-items-center justify-content-between mb-3">
                    <div className="text">DỊCH VỤ</div>
                    <button className='py-1 px-2 btn-refresh-service ms-3' onClick={() => refresh()}>
                        <FontAwesomeIcon
                            className='me-1 icon' icon={faRotateRight} style={{ color: "#03989e", }} /> Tải lại</button>
                </div>
                <div className="row d-flex flex-lg-row-reverse justify-content-between align-items-start">
                    <div className="ps-3 pb-3 col-12 col-lg-3">
                        <div className="insert-update p-3">
                            <div className=""><span className="me-2">{obUpdate ? "CẬP NHẬT" : "THÊM DỊCH VỤ "}</span>
                                <FontAwesomeIcon onClick={() => { form.resetFields(); setObUpdate(null) }}
                                    icon={faArrowsRotate} spinPulse style={{ color: "#63E6BE", cursor: "pointer" }} /></div>
                            <hr />
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
                                <Row >
                                    <Col span={24}>
                                        <Form.Item
                                            preserve={false}
                                            name={"name"}
                                            label="Tên dịch vụ"
                                            rules={[{
                                                required: true,
                                                message: 'Vui lòng nhập tên dịch vụ!',
                                            }]}>
                                            <Input placeholder="Nhập tên dịch vụ" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name={"price"}
                                            label="Giá dịch vụ"
                                            rules={[{
                                                required: true,
                                                message: 'Vui lòng nhập giá dịch vụ!',
                                            },
                                            {
                                                pattern: /^[0-9]*$/,
                                                message: 'Vui lòng nhập số!',
                                            }]}>

                                            <InputNumber placeholder="Nhập giá dịch vụ" suffix="VNĐ" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="description"
                                            label="Mô tả"
                                        >
                                            <TextArea rows={4} placeholder="Mô tả dịch vụ" />
                                        </Form.Item>
                                    </Col>
                                    {obUpdate &&
                                        <Col span={24}>
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


                                    <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit"
                                                onClick={() => { handleInsertUpdate() }}>{obUpdate ? "Cập nhật" : "Thêm"}</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>

                    <div className="col-12 col-lg-9">
                        <div className="table-service bg-white ">
                            <div className="table-head">
                                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} className="ms-3 my-3 w-25"
                                    value={search}
                                    onChange={(event) => { handleChangeSearch(event) }} />
                            </div>
                            <div className="table-body">
                                <table className="table">
                                    <thead className="text-uppercase text-secondary row-1">
                                        <tr>
                                            <th scope="col">
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        checked={checkAll}
                                                        onChange={() => { handleChangeSelectedAll() }}
                                                        size="small"
                                                    />
                                                </div>
                                            </th>
                                            <th scope="col" className="text-secondary px-1">Tên dịch vụ</th>
                                            <th scope="col" className="text-secondary text-center pe-5">Giá</th>
                                            <th scope="col" className="text-secondary px-1 d-none d-lg-block">Mô tả</th>
                                            <th scope="col" className="text-secondary px-1">Trạng thái</th>
                                            <th scope="col" className="text-secondary px-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {+listServiceType.length > 0 && +totalPages != 0 ?
                                            <>
                                                {
                                                    listServiceType.map((item, index) => {
                                                        return (
                                                            <tr key={item.id} className="text-start">
                                                                <td className="p-2 d-flex align-items-center">
                                                                    <div className="">
                                                                        <Checkbox
                                                                            checked={item.checked}
                                                                            onChange={() => { handleChange(item, index) }}
                                                                            size="small"
                                                                        /></div>
                                                                </td>
                                                                <td title={item.name} className="text-start px-1 py-3 name text-uppercase">
                                                                    {item?.name || "Khác"}
                                                                </td>
                                                                <td className="text-end pe-5 py-3 price">
                                                                    <div className="">{formatCurrency(item?.price) || "_"}</div>
                                                                </td>
                                                                <td title={item.description} className="text-start px-1 py-3 description">
                                                                    <div>
                                                                        {item?.description || "Chưa có mô tả"}
                                                                    </div>
                                                                </td>
                                                                <td className="text-start px-1 py-3 status">
                                                                    <div className="">
                                                                        {+item?.status === 1 ? <>
                                                                            <span className="pe-2"><FontAwesomeIcon icon={faCircle} beatFade size="2xs" style={{ color: "#63E6BE", }} /></span>Hoạt động
                                                                        </> : <>
                                                                            <span className="pe-2"><FontAwesomeIcon icon={faCircle} flip size="2xs" style={{ color: "#ec3609", }} /></span>Khóa</>}
                                                                    </div>
                                                                </td>
                                                                <td className="px-1 py-3 d-flex justify-content-end">
                                                                    <span className='update me-3' onClick={() => handleUpdate(item)}>
                                                                        <FontAwesomeIcon icon={faPencil} className="icon" size="sm" />
                                                                    </span>
                                                                    <span className='delete me-3' onClick={() => { handleDelete(item) }}>
                                                                        <FontAwesomeIcon icon={faTrashCan} className="icon" size="sm" />
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }
                                            </> :
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    <span className="text-gray-500">Không có dữ liệu</span>
                                                </td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                                <div className='footer-table d-flex justify-content-end mx-2'>
                                    <div className='select-page'>
                                        <div className='me-2 text'>Hiển thị: </div>
                                        <DropdownPaginate page={rowsPerPage}
                                            setPage={handleChangePaginate} />
                                    </div>
                                    <PaginateCustom totalPageCount={totalPages}
                                        setPage={setCurrentPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal
                show={showDeleteModal}
                isShow={handleShow}
                data={obDelete}
                refresh={refresh}
                table={TABLE.SERVICE} />
        </div >
    );
}
export default ServiceOfRoom;