import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RadioButtonList from '../RadioButton/RadioButton';
import { useMutation } from '@/hooks/useMutation';
import { createExamination, getAllDisease, getSpecialties, getUserByCid } from '@/services/doctorService';
import { message, Select } from 'antd';
import { getThirdDigitFromLeft, isNumericString } from '@/utils/numberSeries';
import './AddExamModal.scss';

const AddExamModal = ({ isOpen, onClose, timeSlot, handleAddExamSuscess }) => {

    const [comorbiditiesOptions, setComorbiditiesOptions] = useState([]);
    const [selectedComorbidities, setSelectedComorbidities] = useState([]);
    const [inputComorbidity, setInputComorbidity] = useState('');
    const [shakeId, setShakeId] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [prioritize, setPrioritize] = useState('normal');

    const [specialtySelected, setSpecialtySelected] = useState(null);
    const [specialtyOptions, setSpecialtyOptions] = useState([]);

    const [userInfo, setUserInfo] = useState({});
    const [cid, setCid] = useState('');
    const [symptom, setSymptom] = useState('');
    const [insurance, setInsurance] = useState('');

    const comorbidityContainerRef = useRef(null);
    const inputRef = useRef(null);
    const searchResultsRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const {
        data: dataComorbidities,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchComorbidities,
    } = useMutation(() => getAllDisease());

    useEffect(() => {
        if (dataComorbidities?.DT) {
            const options = dataComorbidities.DT.map(item => ({
                id: item.code,
                label: item.disease,
            }));
            setComorbiditiesOptions(options);
        }
    }, [dataComorbidities]);

    const {
        data: dataSpecialties,
        loading: specialtiesLoading,
        error: specialtiesError,
        execute: fetchSpecialties,
    } = useMutation(() => getSpecialties());

    useEffect(() => {
        if (dataSpecialties?.DT) {
            const options = dataSpecialties.DT.map(item => ({
                value: item.id,
                label: item.name,
                staffId: item.staffId,
                staffName: item.staffName,
                staffPrice: item.staffPrice
            }));
            setSpecialtyOptions(options);
        }
    }, [dataSpecialties]);

    useEffect(() => {
        fetchComorbidities();
        fetchSpecialties();
    }, []);

    const handleSpecialtyChange = (value) => {
        setSpecialtySelected({
            ...specialtyOptions.find(item => item.value === value)
        });
    };

    const handleChangePrioritize = (value) => {
        setPrioritize(value);
    };

    // hàm set lại giá trị ban đầu:
    const resetForm = () => {
        setSpecialtySelected(null);
        setSymptom('');
        setInsurance('');
        setCid('');
        setUserInfo({});
        setSelectedComorbidities([]);
        setInputComorbidity('');
        setPrioritize('normal');
    }

    const handleFindUser = async () => {
        try {
            if (!cid) {
                message.error('Vui lòng nhập số CCCD để tìm kiếm');
                setUserInfo({});
                return;
            }

            if(!isNumericString(cid)){
                message.error('Số CCCD không hợp lệ');
                setUserInfo({});
                return;
            }

            setLoading(true);
            setIsSearching(true);
            
            const response = await getUserByCid(cid);
            if (response.data.DT) {
                // Nếu tìm thấy người dùng
                setUserInfo(response.data.DT);
            } else {
                setUserInfo({});
            }
            setLoading(false);
        } catch (error) {
            console.error("Error getting user by cid:", error.response?.data || error.message);
            setLoading(false);
        }
    }

    // Lọc bệnh đi kèm theo giá trị nhập vào
    const filteredComorbidities = comorbiditiesOptions.filter(comorbidity =>
        comorbidity.label.toLowerCase().includes(inputComorbidity.toLowerCase())
    );

    // Xử lý khi người dùng nhập vào input
    const handleInputChange = (event) => {
        setInputComorbidity(event.target.value);
        setShowSearchResults(true);
    };

    // Chọn bệnh đi kèm
    const handleSelectComorbidity = (comorbidity) => {
        // Kiểm tra xem bệnh đã tồn tại trong danh sách chưa
        if (selectedComorbidities.some(item => item.id === comorbidity.id)) {
            setShakeId(comorbidity.id);
            setTimeout(() => setShakeId(null), 1000);
            return;
        }

        setSelectedComorbidities((prevSelected) => [
            ...prevSelected,
            comorbidity
        ]);
        setInputComorbidity('');
        setShowSearchResults(false);
    };

    // Xóa bệnh đi kèm
    const handleRemoveComorbidity = (id) => {
        setSelectedComorbidities(selectedComorbidities.filter(item => item.id !== id));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                comorbidityContainerRef.current &&
                !comorbidityContainerRef.current.contains(event.target)
            ) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const addExam = async() => {

        if(!userInfo?.id || !cid || !specialtySelected || !symptom) {
            message.error('Thông tin không hợp lệ!');
            return;
        }

        let insuranceCoverage = getThirdDigitFromLeft(insurance);

        const data = {
            userId: userInfo.id,
            staffId: specialtySelected.staffId,
            symptom: symptom,
            special: prioritize ? prioritize : "normal",
            insuranceCoverage: insuranceCoverage || null,
            roomName:  specialtySelected.label,
            price: specialtySelected.staffPrice,
            comorbidities: selectedComorbidities ? selectedComorbidities.map(item => item.id).join(',') : null,
            time: timeSlot ? timeSlot : null,
            is_appointment: timeSlot ? 1 : 0
        }

        try{
            const response = await createExamination(data);
            console.log('Add examination response:', response);
            if(response.EC === 0 && response.DT && response.DT.id) {
                message.success('Thêm khám bệnh thành công!');
                handleAddExamSuscess();
                resetForm();
                onClose();
            } else {
                message.error('Thêm khám bệnh thất bại!');
            }
        } catch (error) {
            console.error("Error creating examination:", error.response?.data || error.message);
            message.error('Thêm khám bệnh thất bại!');
        }
    }

    if (!isOpen) return null;

    return (
        <div className="add-exam-container">
            <div className="add-exam-content">
                <div className='add-exam-header'>
                    Thêm hồ sơ khám bệnh
                </div>
                <div className='add-exam-body'>
                    <div className='pation-info'>
                        <p>Thông tin bệnh nhân:</p>
                        <div className='info-action'>
                            <input className='input-add-exam' maxLength={12}
                                    type='text' value={cid} onChange={(e) => setCid(e.target.value)}
                                    placeholder='Nhập số CCCD để tìm kiếm...' />
                            <button className='find-patient' onClick={handleFindUser}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <div className={`patient-name row mt-3 ${
                            loading ? '' : 
                            userInfo?.lastName && userInfo?.firstName ? 'text-loading' : 'text-danger ms-1 mb-2'
                        }`}>
                            {isSearching && (
                                loading ? (
                                    'Đang tìm kiếm...'
                                ) : userInfo?.lastName && userInfo?.firstName ? (
                                    <div className='row'>
                                        <div className='col-12 d-flex flex-row'>
                                            <div className='col-2'>
                                                <p>Bệnh nhân:</p>
                                            </div>
                                            <div className='col-8'>
                                                {userInfo.lastName} {userInfo.firstName}
                                            </div>
                                        </div>
                                        <div className='col-12 d-flex flex-row mt-3 mb-2'>
                                            <div className='col-2 d-flex align-items-center'>
                                                <p>Số BHYT:</p>
                                            </div>
                                            <div className='col-5'>
                                                <input className='input-add-exam' style={{margin: 0}} maxLength={10}
                                                    type='text' value={insurance} onChange={(e) => setInsurance(e.target.value)}
                                                    placeholder='Nhập số BHYT...' />
                                            </div>
                                        </div>
                                    </div>
                                ) :  'Không tìm thấy người dùng'
                            )}
                        </div>
                    </div>
                    <div className='pation-info row mb-4'>
                        <div className='col-7'>
                            <p>Phòng khám:</p>
                            <div className='info-action'>
                                <Select
                                    showSearch
                                    placeholder="Chọn phòng khám"
                                    optionFilterProp="label"
                                    options={specialtyOptions}
                                    style={{ width: '100%' }}
                                    value={specialtySelected}
                                    className='select-add-exam'
                                    onChange={handleSpecialtyChange}
                                />
                            </div>
                        </div>
                        <div className='col-5'>
                            <p>Bác sĩ:</p>
                            <div className='info-action'>
                                <input className='input-add-exam' maxLength={12} readOnly
                                        type='text' value={specialtySelected ? specialtySelected.staffName : 'Chưa chọn phòng khám'} 
                                        placeholder='Chọn phòng khám trước' />
                            </div>
                        </div>
                    </div>
                    <div className='exam-info'>
                        <p>Ưu tiên:</p>
                        <RadioButtonList 
                            value={prioritize}
                            handleChangePrioritize={handleChangePrioritize}
                        />
                    </div>
                    <div className='exam-info'>
                        <p>Triệu chứng:</p>
                        <input className='input-add-exam' 
                            type='text' value={symptom} onChange={(e) => setSymptom(e.target.value)}
                            placeholder='Nhập triệu chứng...' />
                    </div>
                    <div className='exam-info'>
                        <p>Bệnh đi kèm:</p>
                        <div 
                            ref={comorbidityContainerRef} 
                            className='comorbidities-action'
                        >
                            <div className='comorbidities-list'>
                                {selectedComorbidities.map(comorbidity => (
                                    <div
                                        key={comorbidity.id}
                                        className={`comorbidities-item mb-2 ${shakeId === comorbidity.id ? 'shake' : ''}`}
                                    >
                                        <p>{comorbidity.label}</p>
                                        <i 
                                            className="fa-solid me-2 fa-times"
                                            onClick={() => handleRemoveComorbidity(comorbidity.id)}
                                        ></i>
                                    </div>
                                ))}
                            </div>
                            {/* Input tìm kiếm bệnh đi kèm */}
                            <input
                                ref={inputRef}
                                className='input-add-exam'
                                type='text'
                                placeholder='Thêm bệnh đi kèm...'
                                style={{ background: '#eeeeee', border: 'none', boxShadow: 'none' }}
                                value={inputComorbidity}
                                onChange={handleInputChange}
                                onFocus={() => setShowSearchResults(true)}
                            />
                            {/* Hiển thị danh sách bệnh đi kèm khi có kết quả tìm kiếm */}
                            {showSearchResults && inputComorbidity && (
                                <div 
                                    ref={searchResultsRef}
                                    className='search-results'
                                >
                                    {filteredComorbidities.map(comorbidity => (
                                        <div 
                                            key={comorbidity.id}
                                            className='search-item'
                                            onClick={() => handleSelectComorbidity(comorbidity)}
                                        >
                                            {comorbidity.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='add-exam-footer'>
                    <button className="close-exam-btn" onClick={onClose}>Đóng</button>
                    <button className='add-exam-btn' onClick={addExam}>Thêm</button>
                </div>
            </div>
        </div>
    );
};

AddExamModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    timeSlot: PropTypes.number,
    handleAddExamSuscess: PropTypes.func.isRequired
}

export default AddExamModal;