import { useEffect, useState } from "react";
import DropdownPaginate from "@/pages/Admin/components/Dropdown/DropdownPaginate";
import { faCircle, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getUser } from "@/services/adminService";
import Checkbox from '@mui/material/Checkbox';
import PaginateCustom from "@/pages/Admin/components/Paginate/PaginateCustom";
import DropdownAction from "@/pages/Admin/components/Dropdown/DropdownAction";
import CreateUserModal from "@/pages/Admin/components/Modal/CreateUserModal";
import Loading from "@/components/Loading/Loading";
import "./PatientManage.scss";
import { useMutation } from "@/hooks/useMutation";
import useDebounce from "@/hooks/useDebounce";
import { TABLE } from "@/constant/value";
import { Input } from "antd";
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const PatientManage = () => {
    let [currentPage, setCurrentPage] = useState(1);
    let [rowsPerPage, setRowPaper] = useState({ value: 10, id: 1 });
    let [listUser, setListUser] = useState([]);
    let [totalPages, setTotalPage] = useState(0);
    let [checkAll, setCheckAll] = useState(false);
    let [search, setSearch] = useState("");
    let [showCreateUserModal, setShowCreateUserModal] = useState(false);

    let arr = [2]
    let searchDebounce = "";
    let {
        data: dataUser,
        loading: listUserLoading,
        error: listUserError,
        execute: fetchUsers,
    } = useMutation((query) =>
        getUser(currentPage, rowsPerPage.id, searchDebounce, arr))

    useEffect(() => {
        if (dataUser && dataUser.DT && dataUser.DT.rows && dataUser.DT.count) {
            let _listUser = [...dataUser.DT.rows];
            for (let i = 0; i < _listUser.length; i++) {
                _listUser[i].checked = false;
            }
            console.log(_listUser)
            setListUser(_listUser);
            setTotalPage(dataUser.DT.count / rowsPerPage.value);
        }
    }, [dataUser])

    useEffect(() => {
        fetchUsers();
    }, [currentPage, useDebounce(search, 500), rowsPerPage]);
    searchDebounce = useDebounce(search, 500);
    let handleChange = (item, index) => {
        let _listUser = [...listUser];
        _listUser = _listUser.map(obj =>
            obj.id === item.id ? { ...obj, checked: !item.checked } : obj
        );
        setListUser(_listUser);
    };

    let handleChangeSelectedAll = () => {
        let _listUser = [...listUser];
        setCheckAll(!checkAll);
        _listUser = _listUser.map(obj =>
            checkAll === true ? { ...obj, checked: false } : { ...obj, checked: true }
        );
        setListUser(_listUser);
    }
    let handleChangePaginate = (item) => {
        setRowPaper(item);
        setCurrentPage(1);
    }
    let refresh = () => {
        fetchUsers();
    }

    let handleShow = (value) => {
        setShowCreateUserModal(value)
    }
    let hanldeCreateUser = () => {
        setShowCreateUserModal(true)
    }
    let handleChangeSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1)
    }
    return (
        listUserLoading ? <Loading /> :
            <div className='patient-manage'>
                <div className='container'>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3>BỆNH NHÂN</h3>
                        <button className=' py-1 px-2 btn-add-user' onClick={() => { hanldeCreateUser() }}>
                            <FontAwesomeIcon className='me-1 icon' icon={faPlus} style={{ color: "#0A8FDC", }} />
                            Thêm mới
                        </button>
                    </div>
                    <div className='table-responsive bg-white'>
                        <div className='table-head d-flex align-items-center'>
                            <Input className='w-25 my-3 ms-3' size="large" placeholder="Tìm nhân viên" prefix={<SearchOutlined />}
                                value={search}
                                onChange={(event) => { handleChangeSearch(event) }} />
                        </div>

                        <table className="w-100 text-start">
                            <thead className="text-start text-uppercase text-secondary row-1">
                                <tr>
                                    <th scope="col" className="p-1 ">
                                        <div className="flex items-center">
                                            <Checkbox
                                                checked={checkAll}
                                                onChange={() => { handleChangeSelectedAll() }}
                                                size="small"
                                            />
                                        </div>
                                    </th>
                                    <th scope="col" className="text-start px-3 py-0 name">
                                        Họ và tên
                                    </th>
                                    <th scope="col" className="text-start px-1 py-0">
                                        Chức vụ
                                    </th>
                                    <th scope="col" className="text-start px-1 py-0">
                                        Số điện thoại
                                    </th>
                                    <th scope="col" className="text-start px-1 py-0">
                                        CCCD
                                    </th>
                                    <th scope="col" className="text-start px-1 py-0">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="text-start px-1 py-0">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className='table-body text-secondary'>
                                {+listUser.length > 0 && +totalPages != 0 ?
                                    <>
                                        {
                                            listUser.map((item, index) => {
                                                return (
                                                    <tr key={index} className="bg-white border-b text-start">
                                                        <td className="p-1">
                                                            <div className="flex items-center">
                                                                <Checkbox
                                                                    checked={item.checked}
                                                                    onChange={() => { handleChange(item, index) }}
                                                                    size="small"
                                                                /></div>
                                                        </td>
                                                        <th scope="row" className="d-flex justify-content-start px-1 py-3 min-content-width g-0">
                                                            <img className="image" src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg" alt="Jese image" />
                                                            <div className="ps-1 email ">
                                                                <div className="fw-semibold">{item.lastName + " " + item.firstName}</div>
                                                                <div className="fw-normal">{item.email}</div>
                                                            </div>
                                                        </th>
                                                        <td className="text-start px-3 py-3">
                                                            {item?.userRoleData?.name || "Khác"}
                                                        </td>
                                                        <td className="text-start px-3 py-3">
                                                            {item?.phoneNumber || "Không có"}
                                                        </td>
                                                        <td className="text-start px-3 py-3">
                                                            {item?.cid || "Không có"}
                                                        </td>
                                                        <td className="text-start px-1 py-3">
                                                            <div className="flex items-center">
                                                                {+item?.status === 1 ? <>
                                                                    <span className="pe-2"><FontAwesomeIcon icon={faCircle} beatFade size="2xs" style={{ color: "#63E6BE", }} /></span>Hoạt động
                                                                </> : <>
                                                                    <span className="pe-2"><FontAwesomeIcon icon={faCircle} flip size="2xs" style={{ color: "#ec3609", }} /></span>Khóa</>}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className='iconDetail'>
                                                                <DropdownAction
                                                                    data={item}
                                                                    refresh={refresh}
                                                                    table={TABLE.DEPARTMENT}
                                                                />
                                                            </div>
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
                    <CreateUserModal
                        show={showCreateUserModal}
                        isShow={handleShow}
                        refresh={refresh}
                        table={TABLE.USER} />
                </div >

            </div >
    );
}

export default PatientManage;