import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchOutlined } from "@ant-design/icons";
import "./Room.scss";
import { faBed, faCircle, faPencil, faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import InsertRoom from "./InsertRoom";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import { getAllRoom, getNameDepartment, getRoomById } from "@/services/adminService";
import { Checkbox, Input, Popover } from "antd";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import DropdownPaginate from "../../components/Dropdown/DropdownPaginate";
import PaginateCustom from "../../components/Paginate/PaginateCustom";
import DeleteModal from "../../components/Modal/DeleteModal";
import { TABLE } from "@/constant/value";
import useDebounce from "@/hooks/useDebounce";
import DropdownDepartment from "./DropdownDepartment";
import useQuery from "@/hooks/useQuery";
const Room = () => {
    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let [showInsert, setShowInsert] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);
    let [rowsPerPage, setRowPaper] = useState({ value: 10, id: 1 });
    let [totalPages, setTotalPage] = useState(0);
    let [listRoom, setListRoom] = useState([]);
    let [checkAll, setCheckAll] = useState(false);
    let [search, setSearch] = useState("");
    let [obUpdate, setObUpdate] = useState({});
    let searchDebounce = "";
    let [obDelete, setObDelete] = useState({});
    let [departments, setDepartments] = useState([]);
    let { data: departmentData } = useQuery(() => getNameDepartment())
    let [searchDepartment, setSearchDepartment] = useState(0);
    useEffect(() => {
        if (departmentData && departmentData?.DT?.length > 0) {
            setDepartments(departmentData.DT);
        }
    }, [departmentData])
    let {
        data: dataRoom,
        loading: listRoomLoading,
        error: listRoomError,
        execute: fetchRooms,
    } = useMutation((query) =>
        getAllRoom(currentPage, rowsPerPage.id, searchDebounce, searchDepartment)
    )
    useEffect(() => {
        if (dataRoom && dataRoom.DT && dataRoom.DT.rows && dataRoom.DT) {
            let _listRoom = [...dataRoom.DT.rows];
            for (let i = 0; i < _listRoom.length; i++) {
                let bedFree = 0;
                let bedBusy = 0;
                _listRoom[i].checked = false;
                _listRoom[i].bedQuantity = _listRoom[i].bedRoomData.length;
                for (let j = 0; j < _listRoom[i].bedQuantity; j++) {
                    if (_listRoom[i].bedRoomData[j].status === 1) {
                        bedBusy++;
                    } else {
                        bedFree++;
                    }
                }
                _listRoom[i].bedFree = bedFree;
                _listRoom[i].bedBusy = bedBusy;
            }
            setListRoom(_listRoom);
            setTotalPage(dataRoom.DT.count / rowsPerPage.value);
        }
    }, [dataRoom])
    useEffect(() => {
        fetchRooms();
    }, [currentPage, useDebounce(search, 500), rowsPerPage, searchDepartment]);
    let handleChange = (item, index) => {
        let _listRoom = [...listRoom];
        _listRoom = _listRoom.map(obj =>
            obj.id === item.id ? { ...obj, checked: !item.checked } : obj
        );
        setListRoom(_listRoom);
    };
    let handleChangeSelectedAll = () => {
        let _listRoom = [...listRoom];
        setCheckAll(!checkAll);
        _listRoom = _listRoom.map(obj =>
            checkAll === true ? { ...obj, checked: false } : { ...obj, checked: true }
        );
        setListRoom(_listRoom);
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
        handleShow(false)
        fetchRooms();
    }
    let handleDelete = (item) => {
        setObDelete({ ...item })
        setShowDeleteModal(true)
    }
    let handleShow = (value) => {
        setObUpdate(null)
        setShowDeleteModal(value)
    }
    let handleUpdate = async (item) => {
        setShowInsert(false)
        let reponse = await getRoomById(item.id);
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
    let handleChangeDepartment = (value) => {
        setSearchDepartment(value);
        setCurrentPage(1);
        setSearch("");
    }
    return (
        <div className="room-content">
            <div className="container">
                <div className="room-of-room-content-header d-flex align-items-center justify-content-between py-3">
                    <div className="text">QUẢN LÝ PHÒNG</div>
                    <div>
                        {!showInsert &&
                            <button className=' py-1 px-2 btn-add-room' onClick={() => { setObUpdate(null), setShowInsert(true) }}>
                                <FontAwesomeIcon
                                    className='me-1 icon' icon={faPlus} style={{ color: "#0A8FDC", }} /> Thêm mới</button>
                        }
                        <button className='py-1 px-2 btn-refresh-room ms-3' onClick={() => refresh()}>
                            <FontAwesomeIcon
                                className='me-1 icon' icon={faRotateRight} style={{ color: "#03989e", }} /> Tải lại</button>
                    </div>

                </div>
                <div className={`p-1 animated-div ${showInsert ? 'show' : ''}`}>
                    {showInsert && <InsertRoom
                        obUpdate={obUpdate}
                        departments={departments}
                        handleShowInsert={handleShowInsert}
                        refresh={refresh}
                    />}
                </div>
                <div className="table-room bg-white ">
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
                                    <th scope="col" className="text-secondary px-1">Tên phòng</th>
                                    <th scope="col" className="text-secondary px-1"><div>Khoa  <DropdownDepartment
                                        departments={departments}
                                        change={handleChangeDepartment} />
                                    </div></th>
                                    <th scope="col" className="text-secondary px-1 text-center">Giường</th>
                                    <th scope="col" className="text-secondary ps-5">Trạng thái</th>
                                    <th scope="col" className="text-secondary px-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {+listRoom.length > 0 && +totalPages != 0 ?
                                    <>
                                        {
                                            listRoom.map((item, index) => {
                                                return (
                                                    <Popover
                                                        key={index}
                                                        placement="topLeft"
                                                        content={item.serviceData.map((service, index) => (
                                                            <span key={index}>
                                                                {service.name}
                                                                <br />
                                                            </span>
                                                        ))}
                                                        title="Danh sách dịch vụ"
                                                    >
                                                        <tr className="text-start">

                                                            <td className="p-2 d-flex align-items-center">
                                                                <div className="">
                                                                    <Checkbox
                                                                        checked={item.checked}
                                                                        onChange={() => { handleChange(item, index) }}
                                                                        size="small"
                                                                    /></div>
                                                            </td>
                                                            <td className="text-start px-1 py-2 text-uppercase">
                                                                <div> {item?.name || "Khác"}</div>
                                                            </td>
                                                            <td className="text-start px-1 py-2">
                                                                <div className="fw-normal">{item?.roomDepartmentData?.name || "_"}</div>
                                                            </td>
                                                            <td className="text-center px-1 py-2">
                                                                {item.bedQuantity > 0 ?
                                                                    <div className="fw-normal"><FontAwesomeIcon className="me-2" icon={faBed} style={{ color: "#336bad", }} /> <b>{item?.bedBusy || 0}</b> / {item?.bedQuantity || 0}</div>
                                                                    :
                                                                    <div>
                                                                        -
                                                                    </div>}
                                                            </td>
                                                            <td className=" ps-5 py-2">
                                                                <div className="">
                                                                    {+item?.status === 1 ? <>
                                                                        <span className="pe-2"><FontAwesomeIcon icon={faCircle} beatFade size="2xs" style={{ color: "#03989e", }} /></span>Hoạt động
                                                                    </> : <>
                                                                        <span className="pe-2"><FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ec3609", }} /></span>Khóa</>}
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
                                                    </Popover>
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
                table={TABLE.ROOM} />

        </div>
    );
}

export default Room;