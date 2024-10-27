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

const ExamInfo = ({examData}) => {
    
    const formatSafeDate = (dateString) => {
        if (!dateString) return new Date();
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? new Date() : date;
    };

    
    const [formData, setFormData] = useState({
        medicalTreatmentTier: examData.medicalTreatmentTier?.toString() || '1',
        staffName: examData.staffName || '',
        reason: examData.reason || '',
        symptom: examData.symptom || '',
        diseaseName: examData.diseaseName || '',
        comorbidities: examData.comorbidities ? examData.comorbidities.split(',') : [],
        treatmentResult: examData.treatmentResult || '',
        admissionDate: formatSafeDate(examData.admissionDate),
        dischargeDate: formatSafeDate(examData.dischargeDate),
        price: examData.price || 0,
        special: examData.special || '0'
    });

    
    const [initialFormData, setInitialFormData] = useState(formData);
    const [isChanged, setIsChanged] = useState(false);
    const [comorbiditiesOptions, setComorbiditiesOptions] = useState([]);

    // Notification
    const [api, contextHolder] = notification.useNotification();

    const options = [
        { value: '1', label: 'Khám bệnh' },
        { value: '2', label: 'Điều trị ngoại trú' }
    ];

    const specialOptions = [
        { value: '0', label: 'Không' },
        { value: '1', label: 'Trẻ em' },
        { value: '2', label: 'Người già' },
        { value: '3', label: 'Phụ nữ mang thai' },
        { value: '4', label: 'Người khuyết tật' }
    ];

    // Fetch comorbidities
    const {
        data: dataComorbidities,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchComorbidities,
    } = useMutation(() => getAllDisease());

    useEffect(() => {
        fetchComorbidities();
    }, []);

    useEffect(() => {
        if (dataComorbidities?.DT) {
            const options = dataComorbidities.DT.map(item => ({
                value: item.code,
                label: item.disease,
            }));
            setComorbiditiesOptions(options);
        }
    }, [dataComorbidities]);

    // Check for changes
    useEffect(() => {
        const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);
        setIsChanged(isDataChanged);
    }, [formData, initialFormData]);

    // Handlers for form updates
    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleDateChange = (field) => (date) => {
        setFormData(prev => ({
            ...prev,
            [field]: date
        }));
    };

    const handleComorbiditiesChange = (value) => {
        setFormData(prev => ({
            ...prev,
            comorbidities: value
        }));
    };

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    const handleSaveButton = async () => {
        if(!formData.reason || !formData.symptom) {
            openNotification('Vui lòng điền đầy đủ tất cả các trường!', 'error');
            return;
        }

        const data = {
            id: examData.id,
            userId: examData.userId,
            staffId: examData.staffId,
            symptom: formData.symptom,
            diseaseName: formData.diseaseName,
            treatmentResult: formData.treatmentResult,
            comorbidities: formData.comorbidities.join(','),
            admissionDate: convertDateTime(formData.admissionDate),
            dischargeDate: convertDateTime(formData.dischargeDate),
            reason: formData.reason,
            medicalTreatmentTier: formData.medicalTreatmentTier,
            price: formData.price,
            special: formData.special,
            paymentDoctorStatus: 1,
            insuranceCoverage: 1
        };

        try {
            const response = await updateExamination(data);
            if(response && response.DT.includes(1)) {
                openNotification('Lưu thông tin khám bệnh thành công!', 'success');
                setInitialFormData(formData);
            } else {
                openNotification(response.EM, 'error');
            }
        } catch (error) {
            console.error("Error creating examination:", error.response?.data || error.message);
            openNotification('Lưu thông tin khám bệnh thất bại.', 'error');
        }
    };

    const handleRestoreButton = () => {
        setFormData(initialFormData);
    };

    return (
        <>
            {contextHolder}
            <div className="exam-container">
                <div className="row">
                    <div className="col-2">
                        <p>Bác sĩ khám:</p>
                    </div>
                    <div className="col-4">
                        <p className="info">{formData.staffName}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Lý do vào viện:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={formData.reason} 
                            onChange={handleInputChange('reason')}
                            placeholder="Mô tả lý do vào viện"/>
                    </div>
                    <div className="col-2">
                        <p>Triệu chứng:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={formData.symptom}
                            onChange={handleInputChange('symptom')} 
                            placeholder="Mô tả chi tiết triệu chứng"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Tên bệnh chính:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={formData.diseaseName} 
                            onChange={handleInputChange('diseaseName')}
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
                            value={formData.comorbidities}
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
                            value={formData.medicalTreatmentTier}
                            onChange={handleInputChange('medicalTreatmentTier')}/>
                    </div>
                    <div className="col-2">
                        <p>Kết quả điều trị:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" 
                            value={formData.treatmentResult} 
                            onChange={handleInputChange('treatmentResult')}
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
                            selectedDate={formData.admissionDate}
                            onDateChange={handleDateChange('admissionDate')}
                            placeholder="Chọn ngày..."/>
                    </div>
                    <div className="col-2">
                        <p>Ngày xuất viện:</p>
                    </div>
                    <div className="col-4">
                        <CustomDatePicker
                            className="date-picker"
                            selectedDate={formData.dischargeDate}
                            onDateChange={handleDateChange('dischargeDate')}
                            placeholder="Chọn ngày..."/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Giá:</p>
                    </div>
                    <div className="col-4">
                        <p className="info">{formData.price}</p>
                    </div>
                    <div className="col-2">
                        <p>Đặc biệt:</p>
                    </div>
                    <div className="col-4">
                        <SelectBox
                            className="select-box"
                            options={specialOptions}
                            value={formData.special}
                            onChange={handleInputChange('special')}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9"></div>
                    <div className="col-3 text-end">
                        <button 
                            className={`restore-button ${!isChanged ? 'disabled' : ''}`}
                            onClick={handleRestoreButton}
                            disabled={!isChanged}>
                            Hoàn tác
                        </button>
                        <button 
                            className={`save-button ${!isChanged ? 'disabled' : ''}`}
                            onClick={handleSaveButton}
                            disabled={!isChanged}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

ExamInfo.propTypes = {
    examData: PropTypes.object.isRequired,
};

export default ExamInfo;