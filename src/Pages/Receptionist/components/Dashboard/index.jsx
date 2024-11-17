import { Select } from "antd";
import "./Dashboard.scss"

const ReceptionistDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header row gap2">
                <div className="col-3 statistical-item">
                    <div className="row">
                        <div className="col-7">
                            <div className="col-12 blur-text">
                                <p className="subtext">Số thứ tự</p>
                            </div>
                            <div className="col-12 orange number-text">
                                <p className="number">87</p>
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
                            <div className="col-12 blue number-text">
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
                            <div className="col-12 green number-text">
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
                <div className="col-2">
                    <Select className="action-button row">
                        <Select.Option value="sample">Sample</Select.Option>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default ReceptionistDashboard;