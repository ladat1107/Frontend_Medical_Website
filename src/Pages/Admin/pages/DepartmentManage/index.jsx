import "./DepartmentManage.scss";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox, Input } from "antd";
import { useMutation } from "@/hooks/useMutation";
import { getDepartment, getDepartmentById } from "@/services/adminService";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { TABLE } from "@/constant/value";
import DropdownPaginate from "../../components/Dropdown/DropdownPaginate";
import PaginateCustom from "../../components/Paginate/PaginateCustom";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import DeleteModal from "../../components/Modal/DeleteModal";
import InsertDepartment from "./InsertDepartment";

const DepartmentManage = () => {
    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [showInsert, setShowInsert] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);
    let [rowsPerPage, setRowPaper] = useState({ value: 10, id: 1 });
    let [totalPages, setTotalPage] = useState(0);
    let [listDepartment, setListDepartment] = useState([]);
    let [checkAll, setCheckAll] = useState(false);
    let [search, setSearch] = useState("");
    let [obUpdate, setObUpdate] = useState({});
    let searchDebounce = "";
    let [obDelete, setObDelete] = useState({});
    let {
        data: dataDepartment,
        loading: listDepartmentLoading,
        error: listDepartmentError,
        execute: fetchDepartments,
    } = useMutation((query) =>
        getDepartment(currentPage, rowsPerPage.id, searchDebounce)
    )
    useEffect(() => {
        if (dataDepartment && dataDepartment.DT && dataDepartment.DT.rows && dataDepartment.DT) {
            let _listDepartment = [...dataDepartment.DT.rows];
            for (let i = 0; i < _listDepartment.length; i++) {
                _listDepartment[i].checked = false;
            }
            setListDepartment(_listDepartment);
            setTotalPage(dataDepartment.DT.count / rowsPerPage.value);
        }
    }, [dataDepartment])

    useEffect(() => {
        fetchDepartments();
    }, [currentPage, useDebounce(search, 500), rowsPerPage]);
    let handleChange = (item, index) => {
        let _listDepartment = [...listDepartment];
        _listDepartment = _listDepartment.map(obj =>
            obj.id === item.id ? { ...obj, checked: !item.checked } : obj
        );
        setListDepartment(_listDepartment);
    };
    let handleChangeSelectedAll = () => {
        let _listDepartment = [...listDepartment];
        setCheckAll(!checkAll);
        _listDepartment = _listDepartment.map(obj =>
            checkAll === true ? { ...obj, checked: false } : { ...obj, checked: true }
        );
        setListDepartment(_listDepartment);
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
        fetchDepartments();
    }
    let handleShowConfirm = () => {

    }
    let handleDelete = (item) => {
        setObDelete({ ...item })
        setShowDeleteModal(true)
    }
    let handleShow = (value) => {
        setShowDeleteModal(value)
    }
    let handleUpdate = async (item) => {
        setShowInsert(false)
        let reponse = await getDepartmentById(item.id);
        if (reponse?.data?.EC == 0) {
            let value = reponse?.data?.DT;
            setObUpdate(value)
            setShowInsert(true)
        } else {
            message.error(reponse?.data?.EM || "Không thể chọn phòng ban")
            refresh();
        }
    }
    let handleShowInsert = (value) => {
        setObUpdate(null)
        setShowInsert(value)
    }
    return (
        <div className="department-content">
            <div className="container">
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <h4>QUẢN LÝ KHOA</h4>
                    {!showInsert &&
                        <button className=' py-1 px-2 btn-add-department' onClick={() => { setShowInsert(true) }}>
                            <FontAwesomeIcon
                                className='me-1 icon' icon={faPlus} style={{ color: "#0A8FDC", }} /> Thêm mới</button>}
                </div>
                <div className={`p-2 animated-div ${showInsert ? 'show' : ''}`}>
                    {showInsert && <InsertDepartment
                        obUpdate={obUpdate || {}}
                        handleShowInsert={handleShowInsert}
                        refresh={refresh} />}
                </div>

                <div className="table-department bg-white ">
                    <div className="table-head">
                        <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} className="ms-3 my-3 w-25" />
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
                                    <th scope="col" className="text-secondary px-1">Khoa</th>
                                    <th scope="col" className="text-secondary px-1">Trưởng khoa</th>
                                    <th scope="col" className="text-secondary px-1 d-none d-lg-block">Email</th>
                                    <th scope="col" className="text-secondary px-1">Vị trí</th>
                                    <th scope="col" className="text-secondary px-1">Trạng thái</th>
                                    <th scope="col" className="text-secondary px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {+listDepartment.length > 0 && +totalPages != 0 ?
                                    <>
                                        {
                                            listDepartment.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr key={index} className="text-start">
                                                            <td className="p-2 d-flex align-items-center">
                                                                <div className="">
                                                                    <Checkbox
                                                                        checked={item.checked}
                                                                        onChange={() => { handleChange(item, index) }}
                                                                        size="small"
                                                                    /></div>
                                                            </td>
                                                            <td className="text-start px-1 py-2 text-uppercase">
                                                                {item?.name || "Khác"}
                                                            </td>
                                                            <td scope="row" className="px-1 py-2 ">
                                                                <div className="ps-1 dead ">
                                                                    {item?.deanDepartmentData?.staffUserData.lastName ?
                                                                        <div className="">{item?.deanDepartmentData?.staffUserData?.lastName + " " + item?.deanDepartmentData?.staffUserData?.firstName}</div>
                                                                        :
                                                                        <div><span className="rounder">Trống</span></div>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="text-start px-1 py-2 d-none d-lg-block">
                                                                <div className="fw-normal">{item?.deanDepartmentData?.staffUserData?.email || "_"}</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-start px-1 py-2">
                                                                    {item?.address || "Khác"}
                                                                </div>
                                                            </td>
                                                            <td className="text-start px-1 py-2">
                                                                <div className="">
                                                                    {+item?.status === 1 ? <>
                                                                        <span className="pe-2"><FontAwesomeIcon icon={faCircle} beatFade size="2xs" style={{ color: "#63E6BE", }} /></span>Hoạt động
                                                                    </> : <>
                                                                        <span className="pe-2"><FontAwesomeIcon icon={faCircle} flip size="2xs" style={{ color: "#ec3609", }} /></span>Khóa</>}
                                                                </div>
                                                            </td>
                                                            <td className="px-1 py-2 d-flex justify-content-end">
                                                                <span className='update me-3' onClick={() => handleUpdate(item)}>
                                                                    <FontAwesomeIcon icon={faPencil} className="icon" size="sm" />
                                                                </span>
                                                                <span className='delete me-3' onClick={() => { handleDelete(item) }}>
                                                                    <FontAwesomeIcon icon={faTrashCan} className="icon" size="sm" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </>
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
            <DeleteModal
                show={showDeleteModal}
                isShow={handleShow}
                data={obDelete}
                refresh={refresh}
                table={TABLE.DEPARTMENT} />
        </div>
    )
}

export default DepartmentManage;