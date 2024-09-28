import React, { useEffect, useState } from 'react'
import { useAuthenContext } from "@/contexts/AuthenContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { getUser } from "@/services/adminService";
import Paginate from "react-paginate-in-peace";
import useDebounce from '@/hooks/useDebounce';
import Checkbox from '@mui/material/Checkbox';
import "./UserManage.scss";
import UseMenu from './DropdownMenu';
const UserManage = () => {
    const { handleDropdown } = useAuthenContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowPaper] = useState(3);
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPage] = useState(0);
    const [checkAll, setCheckAll] = useState(false);
    const [search, setSearch] = useState("");
    let searchDebounce = "";

    const fetchUsers = async () => {
        let response = await getUser(currentPage, rowsPerPage, searchDebounce)
        if (response && response.data && response.data.DT && response.data.DT.rows && response.data.DT.rows.length > 0) {
            let _listUser = [...response.data.DT.rows];
            for (let i = 0; i < _listUser.length; i++) {
                _listUser[i].checked = false;
            }
            setTotalPage(response.data.DT.count / rowsPerPage);
            setListUser(_listUser);
        }
    }
    searchDebounce = useDebounce(search, 500);
    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchDebounce]);

    const handleChange = (item, index) => {
        let _listUser = [...listUser];
        _listUser = _listUser.map(obj =>
            obj.id === item.id ? { ...obj, checked: !item.checked } : obj
        );
        setListUser(_listUser);
    };
    const handleChangeSelectedAll = () => {
        let _listUser = [...listUser];
        setCheckAll(!checkAll);
        _listUser = _listUser.map(obj =>
            checkAll === true ? { ...obj, checked: false } : { ...obj, checked: true }
        );
        setListUser(_listUser);
    }
    return (
        <>
            <div className='user-manage'>
                <div className='container'>
                    <div className='d-flex align-items-center mb-3'>
                        <h3>Người dùng</h3>
                        <button className='btn ml-auto px-3  btn-add-user'><FontAwesomeIcon className='me-2 icon' icon={faPlus} style={{ color: "#6ae1f9", }} /> Thêm mới</button>
                    </div>

                    <div className='table-responsive'>
                        <div className='d-flex align-items-center'>
                            <input type="text"
                                value={search}
                                onChange={(event) => { setSearch(event.target.value) }} />
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <Checkbox
                                                checked={checkAll}
                                                onChange={() => { handleChangeSelectedAll() }}
                                                size="small"
                                            />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Họ và tên
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Chức vụ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Số điện thoại
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        CCCD
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Trạng thái
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser.length > 0 &&
                                    listUser.map((item, index) => {
                                        return (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            checked={item.checked}
                                                            onChange={() => { handleChange(item, index) }}
                                                            size="small"
                                                        /></div>
                                                </td>
                                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img className="w-10 h-10 rounded-full" src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg" alt="Jese image" />
                                                    <div className="ps-3">
                                                        <div className="text-base font-semibold">{item.lastName + " " + item.firstName}</div>
                                                        <div className="font-normal text-gray-500">{item.email}</div>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item?.userRoleData?.name || "Khác"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.phoneNumber || "Không có"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.cid || "Không có"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        {+item?.status === 1 ? <>
                                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>Hoạt động
                                                        </> : <>
                                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>Khóa</>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className='iconDetail'>
                                                        <UseMenu userChoose={item} />
                                                    </div>
                                                </td>
                                            </tr>
                                            //     <td className="px-6 py-4">
                                            //     {/* <!-- Modal toggle --> */}
                                            //     <a href="#" type="button" className="font-medium">
                                            //         {/* data-modal-target="editUserModal" data-modal-show="editUserModal" */}
                                            //         <FontAwesomeIcon className='iconDetail' icon={faEllipsisVertical} size="lg" />
                                            //     </a>
                                            // </td>
                                        )

                                    })}
                            </tbody>
                        </table>
                        <Paginate
                            totalPageCount={totalPages} // Required Property
                            setPage={setCurrentPage} // Required Property
                        // activeDigitColor={"white"} // Optional Property
                        // activeBackgroundColor={"#21385b"} // Optional Property
                        // buttonBorderColor={""} // Optional Property
                        // arrowColor={"#21385b"} // Optional Property
                        // dotColor={"#000"} // Optional Property
                        />
                    </div>


                </div >
            </div >

        </>


    )
}

export default UserManage