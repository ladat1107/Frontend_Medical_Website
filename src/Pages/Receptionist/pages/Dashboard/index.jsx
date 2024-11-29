import { Pagination, Select } from "antd";
import "./Dashboard.scss"
import { useEffect, useState } from "react";
import AddExamModal from "../../components/AddExamModal/AddExamModal";
import { useMutation } from "@/hooks/useMutation";
import { getExaminations } from "@/services/doctorService";
import PatientItem from "../../components/PatientItem/PatientItem";
import { TIMESLOTS } from "@/constant/value";
import { convertDateTime } from "@/utils/formatDate";

const ReceptionistDashboard = () => {
    const today = new Date().toISOString();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [isAppointment, setIsAppointment] = useState(1);
    const [time, setTime] = useState(null);
    const [search, setSearch] = useState('');
    const status = 2;

    const [totalPatient, setTotalPatient] = useState(0);
    const [totalAppointment, setTotalAppointment] = useState(0);

    
    const openAddExam = (timeSlot) => {
        setIsModalOpen(true);
        setSelectedTimeSlot(timeSlot);
    };
    const closeAddExam = () => setIsModalOpen(false);

    const [listExam, setListExam] = useState([]);

    const {
        data: dataExaminations,
        loading: loadingExaminations,
        error: errorExaminations,
        execute: fetchExaminations,
    } = useMutation(() => getExaminations(today, status, isAppointment, currentPage, pageSize, search, time))

    useEffect(() => {
        fetchExaminations();
    }, [isAppointment, search, time, currentPage, pageSize]);

    useEffect(() => {
        if (dataExaminations) {
            setTotal(dataExaminations.DT.totalItems);
            setListExam(dataExaminations.DT.examinations);
            setTotalPatient(dataExaminations.DT.totalPatient);
            setTotalAppointment(dataExaminations.DT.totalAppointment);
        }
    }, [dataExaminations]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleAddExamSuscess = () => {
        fetchExaminations();
    }

    const handelSelectChange = (value) => {
        setIsAppointment(value === 'appointment' ? 1 : 0 );
    }
    
    const handleTimeChange = (value) => {
        setTime(value);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const downItem = () => {
        fetchExaminations();
    }

    const renderExaminationByTimeSlot = () => {
        // Nếu có chọn time cụ thể, chỉ render time đó
        if (time) {
            const selectedTimeSlot = TIMESLOTS.find(slot => slot.value === time);
            const examsInTimeSlot = listExam.filter(exam => exam.time === time);
            
            return (
                <div key={time} className="dashboard-content mt-4">
                    <p className="time">{selectedTimeSlot.label}</p>
                    {examsInTimeSlot.length === 0 ? (
                        <div className="no-patient d-flex justify-content-center mt-2">
                            <p>Không tìm thấy bệnh nhân!</p>
                        </div>
                    ) : (
                        examsInTimeSlot.map((item, index) => (
                            <PatientItem
                                key={item.id}
                                index={index + 1}
                                id={item.id}
                                name={`${item.userExaminationData.lastName} ${item.userExaminationData.firstName}`}
                                symptom={item.symptom}
                                special={item.special}
                                room={item.roomName}
                                doctor={`${item.examinationStaffData.staffUserData.lastName} ${item.examinationStaffData.staffUserData.firstName}`}
                                downItem={downItem}
                                visit_status={item.visit_status}
                            />
                        ))
                    )}
                    <div className="add-patient justify-content-center mt-2 row" onClick={() => openAddExam(time.value)}>
                        <div className="d-flex justify-content-center">
                            <i className="fa-solid me-2 fa-plus"></i>
                            <p>Thêm bệnh nhân</p>
                        </div>
                    </div>
                </div>
            );
        }
        
        // Nếu không chọn time, render toàn bộ như cũ
        return TIMESLOTS.map((timeSlot) => {
            const examsInTimeSlot = listExam.filter(exam => exam.time === timeSlot.value);

            return (
                <div key={timeSlot.value} className="dashboard-content mt-4">
                    <p className="time">{timeSlot.label}</p>
                    {examsInTimeSlot.length === 0 ? (
                        <div className="no-patient d-flex justify-content-center mt-2">
                            <p>Không tìm thấy bệnh nhân!</p>
                        </div>
                    ) : (
                        examsInTimeSlot.map((item, index) => (
                            <PatientItem
                                key={item.id}
                                index={index + 1}
                                id={item.id}
                                name={`${item.userExaminationData.lastName} ${item.userExaminationData.firstName}`}
                                symptom={item.symptom}
                                special={item.special}
                                room={item.roomName}
                                doctor={`${item.examinationStaffData.staffUserData.lastName} ${item.examinationStaffData.staffUserData.firstName}`}
                                downItem={downItem}
                                visit_status={item.visit_status}
                            />
                        ))
                    )}
                    <div className="add-patient justify-content-center mt-2 row" onClick={() => openAddExam(timeSlot.value)}>
                        <div className="d-flex justify-content-center">
                            <i className="fa-solid me-2 fa-plus"></i>
                            <p>Thêm bệnh nhân</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

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
                                {/* <p className="subtext inline">/100</p> */}
                            </div>
                            <div className="col-12 blur-text">
                                <p className="subtext">Ngày {convertDateTime(new Date())}</p>
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
                                <p className="number">{totalPatient}</p>
                            </div>
                            <div className="col-12 blur-text">
                                <p className="subtext">Ngày {convertDateTime(new Date())}</p>
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
                                <p className="number">{totalAppointment}</p>
                            </div>
                            <div className="col-12 blur-text">
                                <p className="subtext">Ngày {convertDateTime(new Date())}</p>
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
                            <Select className="select-box" defaultValue="appointment" onChange={handelSelectChange}>
                                <Select.Option value="appointment">Hẹn khám</Select.Option>
                                <Select.Option value="getnumber">Bốc số</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="col-4"  style={{paddingRight: "0"}}>
                        <div className="action-item">
                            <Select className="select-box" allowClear
                                    placeholder="Chọn khung giờ" 
                                    onChange={handleTimeChange}
                                    value={time} options={TIMESLOTS}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="action-item">
                            <input type="text" className="search-box" 
                                    placeholder="Tìm kiếm bệnh nhân..." 
                                    onChange={handleSearch}/>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-end" style={{padding: '0'}}>
                    <button className="find-button" onClick={() => openAddExam(null)} >Thêm bệnh nhân trực tiếp</button>
                </div>
            </div>
            <div className="dashboard-content mt-4">
                {isAppointment === 1 && (
                    renderExaminationByTimeSlot()
                )}
                { isAppointment === 0 && (
                    listExam && listExam.length > 0 ? listExam.map((item, index) => (
                        <PatientItem
                                key={item.id}
                                index={index + 1}
                                id={item.id}
                                name={`${item.userExaminationData.lastName} ${item.userExaminationData.firstName}`}
                                symptom={item.symptom}
                                special={item.special}
                                room={item.roomName}
                                doctor={`${item.examinationStaffData.staffUserData.lastName} ${item.examinationStaffData.staffUserData.firstName}`}
                                downItem={downItem}
                                visit_status={item.visit_status}
                            />
                    )):(
                        <div className="no-patient d-flex justify-content-center mt-2">
                            <p>Không tìm thấy bệnh nhân!</p>
                        </div>
                    )
                )}

            </div>
            <div className='row mt-4'>
                <Pagination
                    align="center"
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                />
            </div>
            <AddExamModal 
                isOpen={isModalOpen} 
                onClose={closeAddExam} 
                timeSlot={selectedTimeSlot}
                handleAddExamSuscess={handleAddExamSuscess} />
        </div>
    );
}

export default ReceptionistDashboard;