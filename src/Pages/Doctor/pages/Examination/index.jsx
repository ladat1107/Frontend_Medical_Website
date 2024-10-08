import "./Examination.scss";
import CustomDatePicker from "@/components/DatePicker";
import SelectBox from "@/components/Combobox";
import ExamInfo from "../../components/Examinfo";
import VitalSign from "../../components/Vitalsign";
import Paraclinical from "../../components/paraclinical";
import Prescription from "../../components/Prescription";
import { useState } from "react";
import Presdetail from "../../components/Presdetail";

const Examination = () => {

    const [selectedRadio, setSelectedRadio] = useState('info');
    const [examDate, setExamDate] = useState(new Date()); 

    const handleExamDateChange = (date) => {
        setExamDate(date);
    };

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    return (
        <>
            <div className="container">
                <div className="exam-content">
                    <p className="exam-header">Thông tin bệnh nhân</p>
                    <hr />
                    <div className="row">
                        <div className="col-5 mb-0">
                            <div className="row">
                                <div className="col-4">
                                    <p className="title">Họ tên</p>
                                </div>
                                <div className="col-8">
                                    <p className="info">Nguyễn Văn A</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p className="title">Ngày sinh</p>
                                </div>
                                <div className="col-8">
                                    <p className="info">1 / 1 / 2000</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p className="title">Giới tính</p>
                                </div>
                                <div className="col-8">
                                    <p className="info">Nam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 mb-0">
                            <div className="row">
                                <div className="col-4">
                                    <p className="title">Số điện thoại</p>
                                </div>
                                <div className="col-8">
                                    <p className="info">0123456789</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p className="title">CCCD</p>
                                </div>
                                <div className="col-8">
                                    <p className="info">012345678910</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <p className="title">Ghi chú</p>
                                </div>
                                <div className="col-8">
                                    <p className="info">Người tàn tật</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="exam-content">
                    <p className="exam-header">Thông tin khám bệnh</p>
                    <div className="radio-inputs">
                        <label className="radio">
                            <input type="radio" name="radio" 
                                value="info"
                                defaultChecked={selectedRadio === 'info'}
                                onChange={handleRadioChange}/>
                            <span className="name">Thông tin khám</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="radio" 
                                value="vitalsign"
                                onChange={handleRadioChange}/>
                            <span className="name">Sinh hiệu</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="radio" 
                                value="paraclinical"
                                onChange={handleRadioChange}/>
                            <span className="name">Cận lâm sàng</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="radio" 
                                value="prescription"
                                onChange={handleRadioChange}/>
                            <span className="name">Đơn thuốc</span>
                        </label>
                    </div>
                    <hr />
                    <div className="radio-content">
                        {selectedRadio === 'info' && (
                            <ExamInfo />
                        )}
                        {selectedRadio === 'vitalsign' && (
                            <VitalSign />
                        )}
                        {selectedRadio === 'paraclinical' && (
                            //<Paraclinical />
                            <Presdetail  />
                        )}
                        {selectedRadio === 'prescription' && (
                            <Prescription />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Examination;