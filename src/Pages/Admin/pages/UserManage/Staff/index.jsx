import React, { useEffect, useState } from 'react'
import { useAuthenContext } from "@/contexts/AuthenContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import DropdownPaginate from '@/pages/Admin/components/Dropdown/DropdownPaginate';
import DropdownAction from '@/pages/Admin/components/Dropdown/DropdownAction';
import DropdownPosition from './DropDownPosition';
import useDebounce from '@/hooks/useDebounce';
import Checkbox from '@mui/material/Checkbox';

import PaginateCustom from '@/pages/Admin/components/Paginate/PaginateCustom';
import { getUser, deleteUser } from "@/services/adminService";
import Loading from '@/components/Loading/Loading';
import { useMutation } from '@/hooks/useMutation';

import "./StaffManage.scss";
import { TABLE } from '@/constant/value';
const StaffManage = () => {
    //let { handleDropdown } = useAuthenContext();
    let [currentPage, setCurrentPage] = useState(1);
    let [rowsPerPage, setRowPaper] = useState({ value: 10, id: 1 });
    let [listUser, setListUser] = useState([]);
    let [totalPages, setTotalPage] = useState(0);
    let [checkAll, setCheckAll] = useState(false);
    let [search, setSearch] = useState("");
    let [positionArr, setPositionArr] = useState([1, 3, 4, 5, 6, 7]);
    let searchDebounce = "";
    let {
        data: dataUser,
        loading: listUserLoading,
        error: listUserError,
        execute: fetchUsers,
    } = useMutation((query) =>
        getUser(currentPage, rowsPerPage.id, searchDebounce, positionArr)
    )
    let refresh = () => {
        fetchUsers();
    }
    useEffect(() => {
        if (dataUser && dataUser.DT && dataUser.DT.rows && dataUser.DT.count) {
            let _listUser = [...dataUser.DT.rows];
            for (let i = 0; i < _listUser.length; i++) {
                _listUser[i].checked = false;
            }
            setListUser(_listUser);
            setTotalPage(dataUser.DT.count / rowsPerPage.value);
        }
    }, [dataUser])

    useEffect(() => {
        fetchUsers();
    }, [currentPage, useDebounce(search, 500), positionArr, rowsPerPage]);

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
    let handleChangePosition = (newArr) => {
        setPositionArr(newArr);
        setCurrentPage(1);
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
    return (
        listUserLoading ? <Loading /> : <>
            <div className='user-manage'>
                <div className='container'>
                    <div className='d-flex align-items-center mb-3'>
                        <h3>Nhân viên</h3>
                        <button className='btn ml-auto px-3  btn-add-user'><FontAwesomeIcon className='me-2 icon' icon={faPlus} style={{ color: "#6ae1f9", }} /> Thêm mới</button>
                    </div>

                    <div className='table-responsive'>
                        <div className='table-head d-flex align-items-center'>
                            <div className='search-content d-flex align-items-center'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#d1d1d1", }} />
                                <input type="text" className='head border-0 no-outline' placeholder='Tìm kiếm'
                                    value={search}
                                    onChange={(event) => { handleChangeSearch(event) }} />
                            </div>

                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-1 py-0">
                                        <div className="flex items-center">
                                            <Checkbox
                                                checked={checkAll}
                                                onChange={() => { handleChangeSelectedAll() }}
                                                size="small"
                                            />
                                        </div>
                                    </th>
                                    <th scope="col" className=" px-4 py-0">
                                        Họ và tên
                                    </th>
                                    <th scope="col" className="px-1 py-0">
                                        <DropdownPosition onChange={handleChangePosition} />
                                    </th>
                                    <th scope="col" className="px-1 py-0">
                                        Trình độ
                                    </th>
                                    <th scope="col" className="px-1 py-0">
                                        Phòng khoa
                                    </th>
                                    <th scope="col" className="px-1 py-0">
                                        Số điện thoại
                                    </th>
                                    <th scope="col" className="px-1 py-0">
                                        CCCD
                                    </th>
                                    <th scope="col" className="px-1 py-0">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="px-1 py-0">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {+listUser.length > 0 && +totalPages != 0 ?
                                    <>
                                        {
                                            listUser.map((item, index) => {
                                                return (
                                                    <tr key={index} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td className="w-4 p-1">
                                                            <div className="flex items-center">
                                                                <Checkbox
                                                                    checked={item.checked}
                                                                    onChange={() => { handleChange(item, index) }}
                                                                    size="small"
                                                                /></div>
                                                        </td>
                                                        <th scope="row" className="flex items-center px-1 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                            <img className="w-10 h-10 rounded-full" src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg" alt="Jese image" />
                                                            <div className="ps-1">
                                                                <div className="text-base font-semibold">{item.lastName + " " + item.firstName}</div>
                                                                <div className="font-normal text-gray-500">{item.email}</div>
                                                            </div>
                                                        </th>
                                                        <td className="px-1 py-4">
                                                            {item?.userRoleData?.name || "Khác"}
                                                        </td>
                                                        <td className="px-1 py-4">
                                                            {item?.staffUserData?.position || "Khác"}
                                                        </td>
                                                        <td className="px-1 py-4">
                                                            {item?.staffUserData?.staffDepartmentData?.name || "Khác"}
                                                        </td>
                                                        <td className="px-1 py-4">
                                                            {item?.phoneNumber || "Không có"}
                                                        </td>
                                                        <td className="px-1 py-4">
                                                            {item?.cid || "Không có"}
                                                        </td>
                                                        <td className="px-1 py-4">
                                                            <div className="flex items-center">
                                                                {+item?.status === 1 ? <>
                                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>Hoạt động
                                                                </> : <>
                                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>Khóa</>}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 py-4">
                                                            <div className='iconDetail'>
                                                                <DropdownAction
                                                                    data={item}
                                                                    refresh={refresh}
                                                                    table={TABLE.USER}
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
                </div >
            </div >
        </>


    )
}

export default StaffManage