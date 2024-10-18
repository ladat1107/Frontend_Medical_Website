import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./ExamInfo.scss"
import SelectBox from "@/components/Combobox";
import CustomDatePicker from "@/components/DatePicker";
import { useMutation } from "@/hooks/useMutation";
import { updateExamination, getAllDisease } from "@/services/doctorService";
import MultiSelect from "@/components/MultiSelect";
import { convertDateTime } from "@/utils/convertToTimestamp";
import { notification } from 'antd';

const ExamInfo = ({patientId, examData}) => {

    const [selectedValue, setSelectedValue] = useState(examData.medicalTreatmentTier || '1');

    const [reason, setReason] = useState(examData.reason || '');
    const [symptom, setSymptom] = useState(examData.symptom || '');
    const [diseaseName, setDiseaseName] = useState(examData.diseaseName || '');

    const [comorbiditiesOptions, setComorbiditiesOptions] = useState([]);
    const [selectedComorbidities, setSelectedComorbiditieValue] = useState([]);

    const [treatmentResult, setTreatmentResult] = useState(examData.treatmentResult || '');
    const [admissionDate, setAdmissionDate] = useState(examData.admissionDate || new Date());
    const [dischargeDate, setDischargeDate] = useState(examData.dischargeDate || new Date());
    const [price, setPrice] = useState(examData.price || 0);
    const [special, setSpecial] = useState(examData.special || '');

    //Notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    const options = [
        { value: '1', label: 'Khám bệnh' },
        { value: '2', label: 'Điều trị ngoại trú' }
    ];

    useEffect(() => {
        fetchComorbidities();
    }, []);

    let {
        data: dataComorbidities,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchComorbidities,
    } = useMutation((query) => 
        getAllDisease()  
    );

    useEffect(() => {
        if (dataComorbidities && dataComorbidities.DT) {
            const comorbiditiesOptions = dataComorbidities.DT.map(item => ({
                value: item.code,
                label: item.disease,
            }));
            setComorbiditiesOptions(comorbiditiesOptions);
        }        
    }, [dataComorbidities]);

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleSymptomChange = (event) => {
        setSymptom(event.target.value);
    };

    const handlediseaseNameChange = (event) => {
        setDiseaseName(event.target.value);
    };

    const handleTreatmentResultChange = (event) => {
        setTreatmentResult(event.target.value);
    };

    const handleSpecialChange = (event) => {
        setSpecial(event.target.value);
    };

    const handleSelectedChange = (event) => {
        setSelectedValue(event.target.value); 
    };

    const handleAdmissionDateChange = (date) => {
        setAdmissionDate(date);
    };
    const handleDischargeDateChange = (date) => {
        setDischargeDate(date);
    };

    const handleComorbiditiesChange = (value) => {
        setSelectedComorbiditieValue(value);
        console.log(value)
    };

    const handleSaveButton = async () => {
        const data = {
            id: 26,
            userId: patientId,
            staffId: 1,
            symptom: symptom,
            diseaseName: diseaseName,
            treatmentResult: treatmentResult,
            comorbidities: selectedComorbidities.join(','),
            admissionDate: convertDateTime(admissionDate),
            dischargeDate: convertDateTime(dischargeDate),
            reason: reason,
            medicalTreatmentTier: selectedValue,
            price: price,
            special: special,
            paymentDoctorStatus: 1,
            insuranceCoverage: 1
        }

        try {
            const response = await updateExamination(data);
            if(response && response.DT === 1) { 
                openNotification('Thêm thông tin thành công!', 'success');
            }
        } catch (error) {
            console.error("Error creating examination:", error.response?.data || error.message);
            openNotification('Thêm thông tin thất bại.', 'error');
        }
    }

    return (
        <>
            {contextHolder}
            <div className="exam-container">
                <div className="row">
                    <div className="col-2">
                        <p>Bác sĩ khám:</p>
                    </div>
                    <div className="col-4">
                        <p className="info">Bác sĩ A</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Lý do vào viện:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={reason} 
                            onChange={handleReasonChange}
                            placeholder="Mô tả lý do vào viện"/>
                    </div>
                    <div className="col-2">
                        <p>Triệu chứng:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={symptom}
                            onChange={handleSymptomChange} 
                            placeholder="Mô tả chi tiết triệu chứng"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Tên bệnh chính:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={diseaseName} 
                            onChange={handlediseaseNameChange}
                            placeholder="Mô tả chi tiết tên bệnh"/>
                    </div>
                    <div className="col-2">
                        <p>Bệnh đi kèm:</p>
                    </div>
                    <div className="col-4">
                        <MultiSelect
                            options={comorbiditiesOptions}
                            placeholder="Chọn bệnh đi kèm"
                            onChange={handleComorbiditiesChange}
                            value={selectedComorbidities}
                        />
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
                        <input type="text" className="input" 
                            value={treatmentResult} 
                            onChange={handleTreatmentResultChange}
                            placeholder="Kết quả điều trị"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Ngày nhập viện:</p>
                    </div>
                    <div className="col-4">
                        <CustomDatePicker
                            className="date-picker"
                            selectedDate={admissionDate}
                            onDateChange={handleAdmissionDateChange}
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
                        <p className="info">{price}</p>
                    </div>
                    <div className="col-2">
                        <p>Đặc biệt:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={special} 
                            onChange={handleSpecialChange}
                            placeholder="??"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                        <button className="save-button" onClick={handleSaveButton}>Lưu</button>
                    </div>
                </div>
            </div> 
        </>
    )
}
ExamInfo.propTypes = {
    patientId: PropTypes.number.isRequired,
    examData: PropTypes.object.isRequired,
};

export default ExamInfo;