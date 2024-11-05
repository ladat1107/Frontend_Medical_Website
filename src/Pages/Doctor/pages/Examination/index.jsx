import "./Examination.scss";
import ExamInfo from "./Examinfo";
import VitalSign from "./Vitalsign";
import Paraclinical from "./paraclinical";
import Prescription from "./Prescription";
import { useEffect, useState } from "react";
import { getExaminationById, getUserByCid } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";
import { convertDateTime } from "@/utils/formartDate";
import { convertGender } from "@/utils/convertGender";
import { useParams } from "react-router-dom";

const Examination = () => {
    const { examId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const [selectedRadio, setSelectedRadio] = useState('info');
    const [patientData, setPatientData] = useState({});
    const [examinationData, setExaminationData] = useState({});
    const [vitalSignData, setVitalSignData] = useState({});
    const [paraclinicalData, setParaclinicalData] = useState([]);
    const [prescriptionData, setPrescriptionData] = useState([]);
    const [totalParaclinical, setTotalParaclinical] = useState(0);

    useEffect(() => {
        if (examId) {  // Thêm check để đảm bảo có examId
            fetchExaminationData();
        }
    }, []);

    let refresh = () => {
        fetchExaminationData();
    }
    let {
        data: dataExamination,
        loading: examinationLoading,
        error: examinationError,
        execute: fetchExaminationData,
    } = useMutation((query) =>
        getExaminationById(+examId)
    );

    useEffect(() => {
        if (dataExamination && dataExamination.DT) {
            const fields = [
                "id", "userId", "staffId", "symptom", "diseaseName", "comorbidities",
                "treatmentResult", "admissionDate", "dischargeDate", "status",
                "reason", "medicalTreatmentTier", "paymentDoctorStatus",
                "price", "special", "insuranceCoverage"
            ];

            const formattedData = {
                ...Object.fromEntries(fields.map(field => [field, dataExamination.DT[field] || ""])),
                admissionDate: dataExamination.DT.admissionDate,
                dischargeDate: dataExamination.DT.dischargeDate,
                staffName: dataExamination.DT.examinationStaffData?.staffUserData?.lastName + " " +
                    dataExamination.DT.examinationStaffData?.staffUserData?.firstName || ""
            };

            const totalParaclinicalPrice = (dataExamination.DT.examinationResultParaclincalData || []).reduce(
                (sum, item) => sum + (item.price || 0),
                0
            );
            setTotalParaclinical(totalParaclinicalPrice);
            setExaminationData(formattedData);
            
            setPatientData(dataExamination.DT.userExaminationData || {});
            setVitalSignData(dataExamination.DT.examinationVitalSignData || {});
            setParaclinicalData(dataExamination.DT.examinationResultParaclincalData || []);
            setPrescriptionData(dataExamination.DT.prescriptionExamData || []);

            setIsLoading(false);
        }
    }, [dataExamination]);

    // useEffect(() => {
    //     console.log("dataExamination:", dataExamination);
    //     console.log("examinationData:", examinationData);
    //     console.log("vitalSignData:", vitalSignData);
    //     console.log("paraclinicalData:", paraclinicalData);
    //     console.log("prescriptionData:", prescriptionData);
    //     console.log("examDataID:", examinationData.id);
    //     console.log("patientData:", patientData);
    // }, [dataExamination, examinationData, vitalSignData, paraclinicalData, prescriptionData, patientData]);

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    return (
        <>
            <div className="container">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
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
                                        onChange={handleRadioChange} />
                                    <span className="name">Thông tin khám</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio"
                                        value="vitalsign"
                                        onChange={handleRadioChange} />
                                    <span className="name">Sinh hiệu</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio"
                                        value="paraclinical"
                                        onChange={handleRadioChange} />
                                    <span className="name">Cận lâm sàng</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="radio"
                                        value="prescription"
                                        onChange={handleRadioChange} />
                                    <span className="name">Đơn thuốc</span>
                                </label>
                            </div>
                            <hr />
                            <div className="radio-content">
                                {selectedRadio === 'info' && patientData && patientData.id && (
                                    <ExamInfo
                                        refresh={refresh}
                                        examData={examinationData}
                                    />
                                )}
                                {selectedRadio === 'vitalsign' && (
                                    <VitalSign
                                        refresh={refresh}
                                        vitalSignData={vitalSignData}
                                        examId={examinationData.id}
                                    />
                                )}
                                {selectedRadio === 'paraclinical' && (
                                    <Paraclinical
                                        refresh={refresh}
                                        listParaclinicals={paraclinicalData}
                                        examinationId={examinationData.id}
                                    />
                                )}
                                {selectedRadio === 'prescription' && (
                                    <Prescription
                                        refresh={refresh}
                                        examinationId={examinationData.id}
                                        paraclinicalPrice={totalParaclinical}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Examination;