import { getAppointments, searchAppointments, searchAppointmentsWithStaffId } from "@/services/doctorService";
import React, { useContext, useEffect, useState } from 'react'
import { getTimeSlotById } from "@/utils/formatTimeSlots";
import { convertDateTime } from "@/utils/formatDate";
import { convertStartDateToTimestamp, convertEndDateToTimestamp } from "@/utils/convertToTimestamp";
import SearchBar from "@/components/Search";
import CustomDatePicker from "@/components/DatePicker";
import "./Appointment.scss";
import { useMutation } from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { useSelector } from "react-redux";

const Appointment = () => {
    const navigate = useNavigate();
    // const {user} = useContext(AuthenContext);
    let { user } = useSelector((state) => state.authen);

    const [listAppointments, setListAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState('1');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [total, setTotal] = useState(0);
    // const [staffId, setStaffId] = useState(user.staff);

    let {
        data: dataAppointments,
        loading: appointmentLoading,
        error: listAppointmentsError,
        execute: fetchAppointment,
    } = useMutation((query) =>
        searchAppointmentsWithStaffId(currentPage, pageSize, user.staff, searchTerm, convertStartDateToTimestamp(startDate), convertEndDateToTimestamp(endDate)))

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleClear = () => {
        setSearchTerm('');
        setSelectedValue('1');
        setStartDate(new Date());
        setEndDate(new Date());
    }

    useEffect(() => {
        fetchAppointment();
    }, [currentPage, pageSize]);

    useEffect(() => {
        if (dataAppointments && dataAppointments.DT) {
            setListAppointments(dataAppointments.DT.appointment);
            setTotal(dataAppointments.DT.totalItems);
        }
    }, [dataAppointments]);

    const handleClickRow = (examinationId) => (event) => {
        navigate(`/doctorExamination/${examinationId}`);
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <>
            <div className="appointment-content">
                <div className="appointment-search row">
                    <div className="col-12 col-lg-6">
                        <div className="search-container">
                            <p className="search-title">Tìm kiếm lịch khám</p>
                            <SearchBar
                                placeholder="Nhập tên bệnh nhân để tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            />
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="search-container">
                            <p className="search-title">Ngày khám</p>
                            <div className="date-picker-container">
                                Từ <CustomDatePicker
                                    selectedDate={startDate}
                                    onDateChange={handleStartDateChange}
                                    placeholder="Chọn ngày..."
                                />
                                đến <CustomDatePicker
                                    selectedDate={endDate}
                                    onDateChange={handleEndDateChange}
                                    placeholder="Chọn ngày..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-1">
                        <div className="button-container">
                            <button className="clear-button" onClick={() => { handleClear(); fetchAppointment(); }}>
                                <i className="fa-solid fa-broom"></i>
                            </button>
                            <button className="search-button" onClick={fetchAppointment}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="appointment-container row">
                    <div className="header">
                        <p className="title">Danh sách lịch khám</p>
                    </div>
                    <div className="schedule-content">
                        <table className="appointment-table">
                            <thead className="table-header">
                                <tr>
                                    <th className="w0">STT</th>
                                    <th className="w2">Tên bệnh nhân</th>
                                    <th className="w1">Ngày khám</th>
                                    <th className="w1">Giờ khám</th>
                                    <th className="w2">Triệu Chứng</th>
                                    <th className="w2">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listAppointments.length > 0 && listAppointments.map((item, index) => {
                                    return (
                                        <tr key={index}
                                            onClick={handleClickRow(item.examinationId)}>
                                            <td>{index + 1}</td>
                                            <td>{item.appointmentUserData.lastName + " " + item.appointmentUserData.firstName}</td>
                                            <td>{convertDateTime(item.date)}</td>
                                            <td>{getTimeSlotById(item.time)}</td>
                                            <td>{item.symptom}</td>
                                            <td>{item.specialNote}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <Pagination
                            align="center"
                            current={currentPage}
                            pageSize={pageSize}
                            total={total}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointment