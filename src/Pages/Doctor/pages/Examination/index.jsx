import "./Examination.scss";
import ExamInfo from "../../components/Examinfo";
import VitalSign from "../../components/Vitalsign";
import Paraclinical from "../../components/paraclinical";
import Prescription from "../../components/Prescription";
import { useEffect, useState } from "react";
import { getExaminationById, getUserByCid } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";
import { convertDateTime } from "@/utils/formartDate";
import { convertGender } from "@/utils/convertGender";
import { set } from "lodash";

const Examination = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [selectedRadio, setSelectedRadio] = useState('info');
    const [patientData, setPatientData] = useState({});
    const [examinationData, setExaminationData] = useState({});
    const [vitalSignData, setVitalSignData] = useState({});
    const [paraclinicalData, setParaclinicalData] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState([]);

    let {
        data: dataPatient,
        loading: patientLoading,
        error: patientError,
        execute: fetchPatientData,
    } = useMutation((query) => 
        getUserByCid(123456789)
    );

    useEffect(() => {
        fetchPatientData();
    },[]);

    useEffect(() => {
        if (dataPatient && dataPatient.DT) {
            setPatientData(dataPatient.DT);
        }
    },[dataPatient]);

    let {
        data: dataExamination,
        loading: examinationLoading,
        error: examinationError,
        execute: fetchExaminationData,
    } = useMutation((query) => 
        getExaminationById(26)
    );

    useEffect(() => {
        fetchExaminationData();
    },[]);

    useEffect(() => {
        if(dataExamination && dataExamination.DT) {
            const fields = [
                "id", "userId", "staffId", "symptom", "diseaseName", "comorbidities",
                "treatmentResult", "admissionDate", "dischargeDate", "status", 
                "reason", "medicalTreatmentTier", "paymentDoctorStatus", 
                "price", "special", "insuranceCoverage"
            ];
            
            setExaminationData(Object.fromEntries(
                fields.map(field => [field, dataExamination.DT[field]])
            ));

            setVitalSignData(dataExamination.DT.examinationVitalSignData);
            setParaclinicalData(dataExamination.DT.examinationResultParaclincalData);
            setPrescriptionData(dataExamination.DT.prescriptionExamData);

            setIsLoading(false);
        }
        console.log("dataExamination:", dataExamination);
    }, [dataExamination]);

    // useEffect(() => {
    //     console.log("examinationData:", examinationData);
    //     console.log("vitalSignData:", vitalSignData);
    //     console.log("paraclinicalData:", paraclinicalData);
    //     console.log("prescriptionData:", prescriptionData);
    //     console.log("examDataID:", examinationData.id);
    // }, [examinationData, vitalSignData, paraclinicalData, prescriptionData]);

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
                        {patientData && patientData.cid &&
                            <> 
                                <div className="col-5 mb-0">
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="title">Họ tên</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="info">
                                                {patientData.lastName + " " + patientData.firstName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="title">Ngày sinh</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="info">{convertDateTime(patientData.dob)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="title">Giới tính</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="info">{convertGender(patientData.gender)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5 mb-0">
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="title">Số điện thoại</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="info">{patientData.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="title">CCCD</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="info">{patientData.cid}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <p className="title">Ghi chú</p>
                                        </div>
                                        <div className="col-8">
                                            <p className="info">??????</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
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
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                {selectedRadio === 'info' && patientData && patientData.id && (
                                    <ExamInfo 
                                        examData={examinationData}
                                        patientId={patientData.id}
                                    />
                                )}
                                {selectedRadio === 'vitalsign' && (
                                    <VitalSign 
                                        vitalSignData={vitalSignData}
                                    />
                                )}
                                {selectedRadio === 'paraclinical' && (
                                    <Paraclinical 
                                        listParaclinicals={paraclinicalData}
                                        examinationId={examinationData.id}
                                    />
                                )}
                                {selectedRadio === 'prescription' && (
                                    <Prescription 
                                        examinationId={examinationData.id}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Examination;