import { useEffect, useState } from "react";
import DropdownPaginate from "@/pages/Admin/components/Dropdown/DropdownPaginate";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "@/services/adminService";
import Checkbox from '@mui/material/Checkbox';
import PaginateCustom from "@/pages/Admin/components/Paginate/PaginateCustom";
import DropdownAction from "@/pages/Admin/components/Dropdown/DropdownAction";
import Loading from "@/components/Loading/Loading";
import "./PatientManage.scss";
import { useMutation } from "@/hooks/useMutation";
import useDebounce from "@/hooks/useDebounce";

const PatientManage = () => {
    let [currentPage, setCurrentPage] = useState(1);
    let [rowsPerPage, setRowPaper] = useState({ value: 10, id: 1 });
    let [listUser, setListUser] = useState([]);
    let [totalPages, setTotalPage] = useState(0);
    let [checkAll, setCheckAll] = useState(false);
    let [search, setSearch] = useState("");
    let arr = [2]
    let searchDebounce = "";
    let {
        data: dataUser,
        loading: listUserLoading,
        error: listUserError,
        execute: fetchUsers,
    } = useMutation((query) =>
        getUser(currentPage, rowsPerPage.id, searchDebounce, arr)
    )
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
    return (
        listUserLoading ? <Loading /> :
            <div className='staff-manage'>
                <div className='container'>
                    <div className='d-flex align-items-center mb-3'>
                        <h3>Bệnh nhân</h3>
                        <button className='btn ml-auto px-3  btn-add-user'><FontAwesomeIcon className='me-2 icon' icon={faPlus} style={{ color: "#6ae1f9", }} /> Thêm mới</button>
                    </div>
                    <div className='table-responsive'>
                        <div className='table-head d-flex align-items-center'>
                            <div className='search-content d-flex align-items-center'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#d1d1d1", }} />
                                <input type="text" className='head border-0 no-outline' placeholder='Tìm kiếm'
                                    value={search}
                                    onChange={(event) => { setSearch(event.target.value); setCurrentPage(1) }} />
                            </div>
                            <div className='select-page'>
                                <span className='me-2'>Hiển thị: </span>
                                <DropdownPaginate page={rowsPerPage}
                                    setPage={handleChangePaginate} />
                            </div>
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
                                {+listUser.length > 0 && +totalPages != 0 ?
                                    <>
                                        {
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
                                                                <DropdownAction />
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
                        <PaginateCustom totalPageCount={totalPages}
                            setPage={setCurrentPage} />
                    </div>



                </div >
            </div >
    );
}

export default PatientManage;