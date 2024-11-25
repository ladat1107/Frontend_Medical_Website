import { Select } from "antd";
import "./Dashboard.scss"
import { useState } from "react";
import AddExamModal from "../../components/AddExamModal/AddExamModal";

const ReceptionistDashboard = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAddExam = () => setIsModalOpen(true);
    const closeAddExam = () => setIsModalOpen(false);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header ms-1 row gap2">
                <div className="col-3 statistical-item">
                    <div className="row">
                        <div className="col-7">
                            <div className="col-12 blur-text">
                                <p className="subtext">Số thứ tự</p>
                            </div>
                            <div className="col-12 ms-2 inline">
                                <p className="number inline orange number-text">87</p>
                                <p className="subtext inline">/100</p>
                            </div>
                            <div className="col-12 blur-text">
                                <p className="subtext">Ngày 17/11/2024</p>
                            </div>
                        </div>
                        <div className="col-4 orange d-flex justify-content-center">
                            <div className="icon blur-orange">
                                <i className="fa-solid fa-user-group"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 statistical-item">
                    <div className="row">
                        <div className="col-7">
                            <div className="col-12 blur-text">
                                <p className="subtext">Số bệnh nhân</p>
                            </div>
                            <div className="col-12 ms-2 blue number-text">
                                <p className="number">387</p>
                            </div>
                            <div className="col-12 blur-text">
                                <p className="subtext">Ngày 17/11/2024</p>
                            </div>
                        </div>
                        <div className="col-4 blue d-flex justify-content-center">
                            <div className="icon blur-blue">
                                <i className="fa-solid fa-head-side-mask"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 statistical-item">
                    <div className="row">
                        <div className="col-7">
                            <div className="col-12 blur-text">
                                <p className="subtext">Số lịch hẹn</p>
                            </div>
                            <div className="col-12 ms-2 green number-text">
                                <p className="number">37</p>
                            </div>
                            <div className="col-12 blur-text">
                                <p className="subtext">Ngày 17/11/2024</p>
                            </div>
                        </div>
                        <div className="col-4 green d-flex justify-content-center">
                            <div className="icon blur-green">
                                <i className="fa-solid fa-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-action mt-4 row">
                <div className="col-6 row">
                    <div className="col-3">
                        <div className="action-item">
                            <Select className="select-box" defaultValue="all">
                                <Select.Option value="all">Tất cả</Select.Option>
                                <Select.Option value="getnumber">Bốc số</Select.Option>
                                <Select.Option value="appointment">Hẹn khám</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="action-item">
                            <Select className="select-box" defaultValue="time">
                                <Select.Option value="time">Khung giờ</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="action-item">
                            <input type="text" className="search-box" placeholder="Tìm kiếm bệnh nhân..." />
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-end" style={{padding: '0'}}>
                    <button className="find-button" onClick={openAddExam} >Thêm bệnh nhân</button>
                </div>
            </div>
            <div className="dashboard-content mt-4">
                <p className="time">7:00 - 7:30</p>
                <div className="patient-item mt-2 row">
                    <div className="col-1">
                        <p>1</p>
                    </div>
                    <div className="col-4">
                        <p className="bold-text">Họ và tên</p>
                        <p className="sub-text">Triệu chứng .................................</p>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <p className="special">Người già</p>
                    </div>
                    <div className="col-2">
                        <p className="bold-text">Bác sĩ</p>
                        <p className="sub-text">Đặng Thế Cường</p>
                    </div>
                    <div className="col-1">
                        <p className="bold-text">Phòng</p>
                        <p className="sub-text">A5 303</p>
                    </div>
                    <div className="col-2 d-flex justify-content-end">
                        <i className="fa-solid fa-forward-fast fa-rotate-90"></i>
                    </div>
                </div>
                <div className="add-patient justify-content-center mt-2 row" onClick={openAddExam}>
                    <div className="d-flex justify-content-center">
                        <i className="fa-solid me-2 fa-plus"></i>
                        <p>Thêm bệnh nhân</p>
                    </div>
                </div>
            </div>
            <AddExamModal isOpen={isModalOpen} onClose={closeAddExam} />
        </div>
    );
}

export default ReceptionistDashboard;