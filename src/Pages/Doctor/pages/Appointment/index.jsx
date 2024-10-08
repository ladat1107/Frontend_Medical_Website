import { getAppointments, searchAppointments } from "@/services/doctorService";
import React, { useEffect, useState } from 'react'
import { getTimeSlotById } from "@/utils/formatTimeSlots";
import { convertDateTime } from "@/utils/formartDate";
import {convertStartDateToTimestamp, convertEndDateToTimestamp} from "@/utils/convertToTimestamp";
import SearchBar from "@/components/Search";
import SelectBox from "@/components/Combobox";
import CustomDatePicker from "@/components/DatePicker";
import "./Appointment.scss";
import { useMutation } from "@/hooks/useMutation";

const Appointment = () => {
    const [listAppointments, setListAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState('1');
    const [startDate, setStartDate] = useState(new Date()); 
    const [endDate, setEndDate] = useState(new Date());

    let {
        data: dataAppointments,
        loading: appointmentLoading,
        error: listAppointmentsError,
        execute: fetchAppointment,
    } = useMutation((query) =>
        searchAppointments(1, 10, searchTerm, convertStartDateToTimestamp(startDate), convertEndDateToTimestamp(endDate)))

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSelectedChange = (event) => {
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn
    };

    const handleClear = () => {
        setSearchTerm('');
        setSelectedValue(1);
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const options = [
        { value: '1', label: 'Tất cả' },
        { value: '2', label: 'Đang chờ khám' },
        { value: '3', label: 'Đã khám' },
        { value: '4', label: 'Đã hủy' },
    ];
    console.log(dataAppointments);
    useEffect(() => {
        fetchAppointment();
    },[]);

    useEffect(() => {
            if (dataAppointments && dataAppointments.DT) {
                setListAppointments(dataAppointments.DT);
            }
    },[dataAppointments]);

    return (
        <>
            <div className="content">
                <div className="appointment-search">
                    <div className="search-container">
                        <p className="search-title">Tìm kiếm lịch khám</p>
                        <SearchBar
                            placeholder="Nhập tên bệnh nhân để tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            />
                    </div>
                    <div className="search-container">
                        <p className="search-title">Ngày khám</p>
                        <div className="date-picker">
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
                    <div className="status-container">
                        <p className="search-title">Trạng thái</p>
                        <SelectBox
                            options={options}
                            value={selectedValue}
                            onChange={handleSelectedChange}
                        />
                    </div>
                    <div className="button-container">
                        <button className="clear-button" onClick={() => { handleClear(); fetchAppointment(); }}>Làm sạch</button>
                        <button className="search-button" onClick={fetchAppointment}>Tìm kiếm</button>
                    </div>  
                </div>
                <div className="appointment-container">
                    <div className="header">
                        <p className="title">Danh sách lịch khám</p>
                    </div>
                    <div className="appointment-content">
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
                                        <tr key={index}>
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
                </div>
            </div>
        </>
    )
}

export default Appointment