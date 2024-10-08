import SelectBox2 from "@/components/Selectbox";
import { useState } from "react";
import PropTypes from 'prop-types';
import './Paracdetail.scss'


const Paracdetail = ({ onDelete }) => {

    const [selectedParacOption, setParaclinicalOption] = useState({ value: '', label: '' });
    const [selectedDoctorOption, setDoctorOption] = useState({ value: '', label: '' });

    const paracOptions = [
        { value: '1', label: 'Khám bệnh' },
        { value: '2', label: 'Điều trị ngoại trú' }
    ];

    const doctorOptions = [
        { value: '1', label: 'Bác sĩ A' },
        { value: '2', label: 'Bác sĩ B' }
    ];

    const handleParaclinicalChange = (newValue, newLabel) => {
        setParaclinicalOption({ value: newValue, label: newLabel });
    };
    const handleDoctorChange = (newValue, newLabel) => {
        setDoctorOption({ value: newValue, label: newLabel });
    };

    return (
        <>
            <div className="parac-container">
                <div className="row">
                    <div className="col-2">
                        <p>Loại xét nghiệm:</p>
                    </div>
                    <div className="col-4">
                        <SelectBox2
                            className="select-box2"
                            options={paracOptions}
                            value={selectedParacOption}
                            onChange={handleParaclinicalChange}
                            placeholder="Nhập loại xét nghiệm"
                        />
                    </div>
                    <div className="col-2">
                        <p>Bác sĩ thực hiện:</p>
                    </div>
                    <div className="col-4">
                        <SelectBox2
                            className="select-box2"
                            options={doctorOptions}
                            value={selectedDoctorOption}
                            onChange={handleDoctorChange}
                            placeholder="Nhập bác sĩ thực hiện"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Kết quả:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Nhập kết quả xét nghiệm"/>
                    </div>
                    <div className="col-2">
                        <p>Mô tả:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Mô tả chi tiết kết quả"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Hình ảnh:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Thêm hình ảnh"/>
                    </div>
                    <div className="col-2">
                        <p>Giá</p>
                    </div>
                    <div className="col-4">
                        <p className="info">30.000 VND</p>
                    </div>
                </div>
                <div className="row padding0">
                    <div className='col-8'></div>
                    <div className='col-2'>
                        <button className="delete-button" onClick={onDelete}>Xóa</button>
                    </div>
                    <div className='col-2'>
                        <button className="save-button">Lưu</button>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
Paracdetail.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default Paracdetail;