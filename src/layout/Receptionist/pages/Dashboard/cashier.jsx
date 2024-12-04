import { getExaminations } from "@/services/doctorService";
import React, { useEffect, useState } from 'react'
// import "./Appointment.scss";
import { useMutation } from "@/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { message, Pagination, Spin } from "antd";
import { useSelector } from "react-redux";
import PatientItem from "@/layout/Receptionist/components/PatientItem/PatientItem";
import PayModal from "../../components/PayModal/PayModal";

const Cashier = () => {
    const navigate = useNavigate();
    let { user } = useSelector((state) => state.authen);
    const today = new Date().toISOString();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [listExam, setListExam] = useState([]);
    const [status, setStatus] = useState(4);
    const [patientData, setPatientData] = useState({});
    const [examId, setExamId] = useState(0);

    const isAppointment = 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePay = (id) => {
        const selectedPatient = listExam.find(item => item.id === id);

        if (selectedPatient) {
            setExamId(id);
            setPatientData(selectedPatient);
            setIsModalOpen(true);
        } else {
            // Xử lý trường hợp không tìm thấy bệnh nhân
            message.error('Không tìm thấy thông tin bệnh nhân');
        }
    }
    const closePay = () => setIsModalOpen(false);

    // const handleClickRow = (examinationId) => {
    //     navigate(`/doctorExamination/${examinationId}`);
    // }

    const onPaySusscess = (data) => {
        fetchExaminations();
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const downItem = () => {
        fetchExaminations();
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handelSelectChange = (value) => {
        setStatus(value);
    }

    // #region Fetch data 
    const {
        data: dataExaminations,
        loading: loadingExaminations,
        error: errorExaminations,
        execute: fetchExaminations,
    } = useMutation(() => getExaminations(today, status, '', '', currentPage, pageSize, search, ''))

    useEffect(() => {
        fetchExaminations();
    }, [status, search, currentPage, pageSize]);

    useEffect(() => {
        if (dataExaminations) {
            setTotal(dataExaminations.DT.totalItems);
            setListExam(dataExaminations.DT.examinations);
        }
    }, [dataExaminations]);

    // #endregion

    return (
        <>
            <div className="appointment-content">
                <div className="search-container row">
                    <div className="col-6">
                        <p className="search-title">Tìm kiếm đơn khám</p>
                        <input type="text" className="search-box" 
                                placeholder="Nhập tên bệnh nhân để tìm kiếm..." 
                                value={search}
                                onChange={handleSearch}/>
                    </div>
                </div>
                <div className="appointment-container mt-3 row">
                    <div className="header">
                        <p className="title">Danh sách đơn khám</p>
                    </div>
                    <div className="schedule-content text-center">
                        {loadingExaminations ? (
                            <div className="loading">
                                <Spin />
                            </div>
                        ) : ( listExam && listExam.length > 0 ? listExam.map((item, index) => (
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
                                        onClickItem={()=>handlePay(item.id)}
                                    />
                            )):(
                                <div className="no-patient d-flex justify-content-center mt-2">
                                    <p>Không tìm thấy bệnh nhân!</p>
                                </div>
                            )
                        )}
                    </div>
                    <div className='row'>
                        {!loadingExaminations && isAppointment !== 1 && listExam.length > 0 && (
                            <Pagination
                                align="center"
                                current={currentPage}
                                pageSize={pageSize}
                                total={total}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
                {listExam.length > 0 &&
                    <PayModal
                        isOpen={isModalOpen}
                        onClose={closePay}
                        onPaySusscess={onPaySusscess}
                        patientData={patientData}
                        examId={examId}
                    />
                }
            </div>
        </>
    )
}

export default Cashier