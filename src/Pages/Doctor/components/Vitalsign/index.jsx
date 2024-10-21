import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import "./VitalSign.scss";
import { notification } from 'antd';
import { createOrUpdateVitalSign } from "@/services/doctorService";

const VitalSign = ({vitalSignData}) => {

    const [initialVitalSign, setInitialVitalSign] = useState(vitalSignData);
    const [isChanged, setIsChanged] = useState(false);

    const [height, setHeight] = useState(vitalSignData.height || '');
    const [weight, setWeight] = useState(vitalSignData.weight || '');
    const [fetalWeight, setFetalWeight] = useState(vitalSignData.fetalWeight || '');
    const [pulse, setPulse] = useState(vitalSignData.pulse || '');
    const [hightBloodPressure, setHightBloodPressure] = useState(vitalSignData.hightBloodPressure || '');
    const [lowBloodPressure, setLowPressureBottom] = useState(vitalSignData.lowBloodPressure || '');
    const [temperature, setTemperature] = useState(vitalSignData.temperature || '');
    const [breathingRate, setBreathingRate] = useState(vitalSignData.breathingRate || '');
    const [glycemicIndex, setGlycemicIndex] = useState(vitalSignData.glycemicIndex || '');

    useEffect(() => {
        const isDataChanged = (
            height !== initialVitalSign.height ||
            weight !== initialVitalSign.weight ||
            fetalWeight !== initialVitalSign.fetalWeight ||
            pulse !== initialVitalSign.pulse ||
            hightBloodPressure !== initialVitalSign.hightBloodPressure ||
            lowBloodPressure !== initialVitalSign.lowBloodPressure ||
            temperature !== initialVitalSign.temperature ||
            breathingRate !== initialVitalSign.breathingRate ||
            glycemicIndex !== initialVitalSign.glycemicIndex
        );
        setIsChanged(isDataChanged);
    }, [height, weight, fetalWeight, pulse, hightBloodPressure, lowBloodPressure, temperature, breathingRate, glycemicIndex, initialVitalSign]);

    const handleHeighChange = (event) => {
        setHeight(event.target.value);
    }

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    }

    const handleFetalWeightChange = (event) => {
        setFetalWeight(event.target.value);
    }

    const handlePulseChange = (event) => {
        setPulse(event.target.value);
    }

    const handleHightBloodPressureChange = (event) => {
        setHightBloodPressure(event.target.value);
    }

    const handleLowBloodPressureChange = (event) => {
        setLowPressureBottom(event.target.value);
    }

    const handleTemperatureChange = (event) => {
        setTemperature(event.target.value);
    }

    const handleBreathingRateChange = (event) => {
        setBreathingRate(event.target.value);
    }

    const handleGlycemicIndexChange = (event) => {
        setGlycemicIndex(event.target.value);
    }

    //notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message, type = 'info') => {
        api[type]({
            message: message,
            placement: 'bottomRight',
        });
    };

    //save button
    const handleSaveButton = async () => {
        if (!height || !weight || !fetalWeight || !pulse || !hightBloodPressure || 
            !lowBloodPressure || !temperature || !breathingRate || !glycemicIndex) {
            openNotification('Vui lòng điền đầy đủ tất cả các trường!', 'error');
            return;
        }

        const data = {
            examinationId: 26,
            height: height,
            weight: weight,
            fetalWeight: fetalWeight,
            pulse: pulse,
            hightBloodPressure: hightBloodPressure,
            lowBloodPressure: lowBloodPressure,
            temperature: temperature,
            breathingRate: breathingRate,
            glycemicIndex: glycemicIndex
        }

        try {
            const response = await createOrUpdateVitalSign(data);
            if (response && response.DT) {
                openNotification('Lưu sinh hiệu thành công!', 'success');
                setInitialVitalSign(data);
            } else {
                openNotification('Có lỗi trong quá trình lưu sinh hiệu.', 'error');
            }
        } catch (error) {
            console.error("Error creating examination:", error.response?.data || error.message);
            openNotification('Lưu sinh hiệu thất bại.', 'error');
        }
    }

    const handleRestoreButton = () => {
        setHeight(initialVitalSign.height || '');
        setWeight(initialVitalSign.weight || '');
        setFetalWeight(initialVitalSign.fetalWeight || '');
        setPulse(initialVitalSign.pulse || '');
        setHightBloodPressure(initialVitalSign.hightBloodPressure || '');
        setLowPressureBottom(initialVitalSign.lowBloodPressure || '');
        setTemperature(initialVitalSign.temperature || '');
        setBreathingRate(initialVitalSign.breathingRate || '');
        setGlycemicIndex(initialVitalSign.glycemicIndex || '');
        openNotification('Đã khôi phục giá trị ban đầu.', 'info');
    };

    return (
        <>
            {contextHolder}
            <div className="vital-container">
                <div className="row">
                    <div className="col-2">
                        <p>Chiều cao:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={height} 
                            onChange={handleHeighChange}
                            className="input" 
                            placeholder="Đơn vị: cm"/>
                    </div>
                    <div className="col-2">
                        <p>Cân nặng:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={weight} 
                            onChange={handleWeightChange}
                            className="input" 
                            placeholder="Đơn vị: kg"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Cân nặng con:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={fetalWeight} 
                            onChange={handleFetalWeightChange}
                            className="input" 
                            placeholder="Đơn vị: g"/>
                    </div>
                    <div className="col-2">
                        <p>Mạch:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={pulse} 
                            onChange={handlePulseChange}
                            className="input" 
                            placeholder="Đơn vị: Lần/phút"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Huyết áp trên:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={hightBloodPressure} 
                            onChange={handleHightBloodPressureChange}
                            className="input" 
                            placeholder="Đơn vị: mmHg"/>
                    </div>
                    <div className="col-2">
                        <p>Huyết áp dưới:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={lowBloodPressure} 
                            onChange={handleLowBloodPressureChange}
                            className="input" 
                            placeholder="Đơn vị: mmHg"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Nhiệt độ:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={temperature} 
                            onChange={handleTemperatureChange}
                            className="input" 
                            placeholder="Đơn vị: oC"/>
                    </div>
                    <div className="col-2">
                        <p>Nhịp thở:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={breathingRate}
                            onChange={handleBreathingRateChange}
                            className="input" 
                            placeholder="Đơn vị: Lần/phút"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Chỉ số đường huyết:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            value={glycemicIndex}
                            onChange={handleGlycemicIndexChange}
                            className="input" 
                            placeholder="Đơn vị: mg/dl"/>
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
    )
}
VitalSign.propTypes = {
    vitalSignData: PropTypes.object.isRequired,
};

export default VitalSign;