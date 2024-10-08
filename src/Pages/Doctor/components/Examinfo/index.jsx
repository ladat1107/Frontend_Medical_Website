import { useState } from "react";
import "./ExamInfo.scss"
import SelectBox from "@/components/Combobox";
import CustomDatePicker from "@/components/DatePicker";

const ExamInfo = () => {

    const [selectedValue, setSelectedValue] = useState('1');
    const [examDate, setExamDate] = useState(new Date()); 
    const [dischargeDate, setDischargeDate] = useState(new Date()); 

    const options = [
        { value: '1', label: 'Khám bệnh' },
        { value: '2', label: 'Điều trị ngoại trú' }
    ];

    const handleSelectedChange = (event) => {
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn
    };

    const handleExamDateChange = (date) => {
        setExamDate(date);
    };
    const handleDischargeDateChange = (date) => {
        setDischargeDate(date);
    };

    return (
        <>
            <div className="exam-container">
                <div className="row">
                    <div className="col-2">
                        <p>Bác sĩ khám:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Nhập tên bác sĩ"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Lý do vào viện:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Mô tả lý do vào viện"/>
                    </div>
                    <div className="col-2">
                        <p>Triệu chứng:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Mô tả chi tiết triệu chứng"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Tên bệnh chính:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Mô tả chi tiết tên bệnh"/>
                    </div>
                    <div className="col-2">
                        <p>Bệnh đi kèm:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Chọn bệnh kèm theo"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Loại KCB:</p>
                    </div>
                    <div className="col-4">
                        <SelectBox
                            className="select-box"
                            options={options}
                            value={selectedValue}
                            onChange={handleSelectedChange}/>
                    </div>
                    <div className="col-2">
                        <p>Kết quả điều trị:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Kết quả điều trị"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Ngày nhập viện:</p>
                    </div>
                    <div className="col-4">
                        <CustomDatePicker
                            className="date-picker"
                            selectedDate={examDate}
                            onDateChange={handleExamDateChange}
                            placeholder="Chọn ngày..."/>
                    </div>
                    <div className="col-2">
                        <p>Ngày xuất viện:</p>
                    </div>
                    <div className="col-4">
                        <CustomDatePicker
                            className="date-picker"
                            selectedDate={dischargeDate}
                            onDateChange={handleDischargeDateChange}
                            placeholder="Chọn ngày..."/>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-2">
                        <p>Giá:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Giá"/>
                    </div>
                    <div className="col-2">
                        <p>Đặc biệt:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="??"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                        <button className="save-button">Lưu</button>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default ExamInfo;