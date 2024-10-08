import { useEffect, useState } from "react";
import "./ExamInfo.scss"
import SelectBox from "@/components/Combobox";
import CustomDatePicker from "@/components/DatePicker";
import { useMutation } from "@/hooks/useMutation";
import { createExamination, getDiseaseByName } from "@/services/doctorService";
import SelectBox2 from "@/components/Selectbox";
import { debounce } from 'lodash';

const ExamInfo = () => {

    const [selectedValue, setSelectedValue] = useState('1');

    const [reson, setReson] = useState('');
    const [symptom, setSymptom] = useState('');
    const [deseaseName, setDeseaseName] = useState('');
    const [comorbidities, setComorbidities] = useState({ value: '', label: '' });

    const [comorbiditiesOptions, setComorbiditiesOptions] = useState([]);
    const [treatmentResult, setTreatmentResult] = useState('');
    const [admissionDate, setAdmissionDate] = useState(new Date());
    const [dischargeDate, setDischargeDate] = useState(new Date());
    const [price, setPrice] = useState('30.000 VND');
    const [special, setSpecial] = useState('');

    const options = [
        { value: '1', label: 'Khám bệnh' },
        { value: '2', label: 'Điều trị ngoại trú' }
    ];

    let{
        data: dataComorbidities,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchComorbidities,
    } = useMutation((query) => 
        getDiseaseByName(comorbidities)
    );

    useEffect(() => {
        if (dataComorbidities && dataComorbidities.DT) {
            const formattedOptions = dataComorbidities.DT.map(item => ({
                value: item.disease,
                label: item.disease
            }));
            setComorbiditiesOptions(formattedOptions);
        }
    }, [dataComorbidities]);
    

    const handleComorbiditiesChange = debounce((value, label) => {
        setComorbidities(label);  // Hoặc value nếu bạn cần giá trị khác
        fetchComorbidities();
    }, 300);
    
    

    const handleResonChange = (event) => {
        setReson(event.target.value);
    };

    const handleSymptomChange = (event) => {
        setSymptom(event.target.value);
    };

    const handleDeseaseNameChange = (event) => {
        setDeseaseName(event.target.value);
    };

    const handleTreatmentResultChange = (event) => {
        setTreatmentResult(event.target.value);
    };

    const handleSpecialChange = (event) => {
        setSpecial(event.target.value);
    };

    const handleSelectedChange = (event) => {
        setSelectedValue(event.target.value); // Cập nhật giá trị đã chọn
    };

    const handleAdmissionDateChange = (date) => {
        setAdmissionDate(date);
    };
    const handleDischargeDateChange = (date) => {
        setDischargeDate(date);
    };

    return (
        <>
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
                            value={reson} 
                            onChange={handleResonChange}
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
                            value={deseaseName} 
                            onChange={handleDeseaseNameChange}
                            placeholder="Mô tả chi tiết tên bệnh"/>
                    </div>
                    <div className="col-2">
                        <p>Bệnh đi kèm:</p>
                    </div>
                    <div className="col-4">
                        <SelectBox2
                            className="select-box2"
                            options={comorbiditiesOptions}
                            value={comorbidities}
                            onChange={handleComorbiditiesChange}
                            placeholder="Nhập bệnh đi kèm"
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
                        <button className="save-button">Lưu</button>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default ExamInfo;