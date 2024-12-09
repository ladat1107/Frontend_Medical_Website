import { getListToPay } from "@/services/doctorService";
import React, { useEffect, useState } from 'react'
import { useMutation } from "@/hooks/useMutation";
import { message, Pagination, Select, Spin } from "antd";
import PatientItem from "@/layout/Receptionist/components/PatientItem/PatientItem";
import PayModal from "../../components/PayModal/PayModal";

const Cashier = () => {
    const today = new Date().toISOString();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [listExam, setListExam] = useState([]);
    const [statusPay, setStatus] = useState(4);
    const [patientData, setPatientData] = useState({});
    const [examId, setExamId] = useState(0);
    const [type, setType] = useState('examination');

    const isAppointment = 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePay = (id) => {
        const selectedPatient = listExam.find(item => item.data.id === id);

        if (selectedPatient) {
            setExamId(id);
            setType(selectedPatient.type);
            setPatientData(selectedPatient.data);
            setIsModalOpen(true);
        } else {
            // Xử lý trường hợp không tìm thấy bệnh nhân
            message.error('Không tìm thấy thông tin bệnh nhân');
        }
    }
    const closePay = () => setIsModalOpen(false);

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

    // #region Fetch data 
    const {
        data: dataExaminations,
        loading: loadingExaminations,
        error: errorExaminations,
        execute: fetchExaminations,
    } = useMutation(() => getListToPay(today, statusPay, currentPage, pageSize, search))

    useEffect(() => {
        fetchExaminations();
    }, [statusPay, search, currentPage, pageSize]);

    useEffect(() => {
        if (dataExaminations) {
            setTotal(dataExaminations.DT.pagination.totalItems);
            setListExam(dataExaminations.DT.list);
        }
    }, [dataExaminations]);

    const handelSelectChange = (value) => {
        setStatus(value);
    }

    // #endregion

    return (
        <>
            <div className="appointment-content">
                <div className="search-container row">
                    <div className="col-2">
                        <p className="search-title">Trạng thái</p>
                        <Select className="select-box" defaultValue="4" onChange={handelSelectChange}>
                            <Select.Option value="4">Chưa thanh toán</Select.Option>
                            <Select.Option value="5">Đã thanh toán</Select.Option>
                        </Select>
                    </div>
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
                                item.type === 'examination' ? (
                                    <PatientItem
                                        key={item.data.id}
                                        index={index + 1}
                                        id={item.data.id}
                                        name={`${item.data.userExaminationData.lastName} ${item.data.userExaminationData.firstName}`}
                                        symptom={item.type}
                                        special={item.data.special}
                                        room={item.data.roomName}
                                        doctor={`${item.data.examinationStaffData.staffUserData.lastName} ${item.data.examinationStaffData.staffUserData.firstName}`}
                                        downItem={downItem}
                                        visit_status={item.data.visit_status}
                                        onClickItem={()=>handlePay(item.data.id)}
                                        sort={false}
                                    />
                                ) : (
                                    <PatientItem
                                        key={item.data.id}
                                        index={index + 1}
                                        id={item.data.id}
                                        name={`${item.data.examinationResultParaclincalData.userExaminationData.lastName} ${item.data.examinationResultParaclincalData.userExaminationData.firstName}`}
                                        symptom={item.type}
                                        special={item.data.examinationResultParaclincalData.special}
                                        room={item.data.roomParaclinicalData.name}
                                        doctor={`${item.data.doctorParaclinicalData.staffUserData.lastName} ${item.data.doctorParaclinicalData.staffUserData.firstName}`}
                                        downItem={downItem}
                                        visit_status={item.data.visit_status}
                                        onClickItem={()=>handlePay(item.data.id)}
                                        sort={false}
                                    />
                                )
                            )):(
                                <div className="no-patient d-flex justify-content-center mt-2">
                                    <p>Không tìm thấy bệnh nhân!</p>
                                </div>
                            )
                        )}
                    </div>
                    <div className='row mt-3'>
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
                        type={type}
                        examId={examId}
                    />
                }
            </div>
        </>
    )
}

export default Cashier