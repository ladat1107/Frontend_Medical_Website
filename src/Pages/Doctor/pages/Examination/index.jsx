import { getAppointments } from "@/services/doctorService";
import React, { useEffect, useState } from 'react'
import { getTimeSlotById } from "@/utils/formatTimeSlots";
import { convertDateTime } from "@/utils/formartDate";
import SearchBar from "@/components/Search";
import SelectBox from "@/components/Combobox";
import CustomDatePicker from "@/components/DatePicker";
import "./Examination.scss";

const Examination = () => {
    const [listAppointments, setListAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchAppointment = async () => {
        let response = await getAppointments();
        console.log("asdhajdhasjdasdasd");  
        console.log(response);
        if (response && response.data && response.data.DT) {
            setListAppointments(response.data.DT);
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date); // Cập nhật ngày đã chọn
    };

    const handleSelectedChange = (event) => {
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn
    };

    const options = [
        { value: '1', label: 'Tất cả' },
        { value: '2', label: 'Đang chờ khám' },
        { value: '3', label: 'Đã khám' },
      ];

    useEffect(() => {
        fetchAppointment();
    },[]);

    return (
        <>
            <div className="content">
                <div className="examination-search">
                    <div className="search-container">
                        <p className="search-title">Tìm kiếm lịch khám</p>
                        <SearchBar
                            placeholder="Nhập tên bệnh nhân để tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            />
                    </div>
                    <div className="search-container">
                        <p className="search-title">Trạng thái</p>
                        <SelectBox
                            options={options}
                            value={selectedValue}
                            onChange={handleSelectedChange}
                        />
                    </div>
                    <div className="search-container">
                        <p className="search-title">Ngày khám</p>
                        <CustomDatePicker
                            selectedDate={selectedDate}
                            onDateChange={handleDateChange}
                            placeholder="Chọn ngày..."
                        />
                    </div>
                </div>
                <div className="examination-container">
                    <div className="header">
                        <p className="title">Danh sách lịch khám</p>
                    </div>
                    <div className="examination-content">
                        <table className="examination-table">
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

export default Examination