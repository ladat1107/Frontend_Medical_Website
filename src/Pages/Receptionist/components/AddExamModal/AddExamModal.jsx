import React, { useState } from 'react';
import './AddExamModal.scss';
import PropTypes from 'prop-types';
import RadioButtonList from '../RadioButton/RadioButton';

const AddExamModal = ({ isOpen, onClose }) => {

    // Danh sách bệnh đi kèm
    const comorbidities = [
        { id: 1, name: 'Bệnh lao phổi kinh niên' },
        { id: 2, name: 'Bệnh tiểu đường' },
        { id: 3, name: 'Bệnh tim mạch' },
        { id: 4, name: 'Bệnh huyết áp cao' }
    ];

    const [selectedComorbidities, setSelectedComorbidities] = useState([]);
    const [inputComorbidity, setInputComorbidity] = useState('');
    const [shakeId, setShakeId] = useState(null); // Lưu id của bệnh bị rung lắc

    // Lọc bệnh đi kèm theo giá trị nhập vào
    const filteredComorbidities = comorbidities.filter(comorbidity =>
        comorbidity.name.toLowerCase().includes(inputComorbidity.toLowerCase())
    );

    // Xử lý khi người dùng nhập vào input
    const handleInputChange = (event) => {
        setInputComorbidity(event.target.value);
    };

    // Chọn bệnh đi kèm
    const handleSelectComorbidity = (comorbidity) => {
        // Kiểm tra xem bệnh đã tồn tại trong danh sách chưa
        if (selectedComorbidities.some(item => item.id === comorbidity.id)) {
            setShakeId(comorbidity.id); // Nếu trùng, thêm hiệu ứng rung lắc
            setTimeout(() => setShakeId(null), 1000); // Xóa hiệu ứng sau 1 giây
            return; // Dừng việc thêm vào nếu trùng
        }

        setSelectedComorbidities((prevSelected) => [
            ...prevSelected,
            comorbidity
        ]);
        setInputComorbidity(''); // Reset input sau khi chọn
    };

    // Xóa bệnh đi kèm
    const handleRemoveComorbidity = (id) => {
        setSelectedComorbidities(selectedComorbidities.filter(item => item.id !== id));
    };

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
                            <input className='input-add-exam' type='text' placeholder='Nhập STT hoặc CCCD để tìm kiếm...' />
                            <button className='add-patient'>
                                <i className="fa-solid me-2 fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className='exam-info'>
                        <p>Ưu tiên:</p>
                        <RadioButtonList />
                    </div>
                    <div className='exam-info'>
                        <p>Triệu chứng:</p>
                        <input className='input-add-exam' type='text' placeholder='Nhập triệu chứng...' />
                    </div>
                    <div className='exam-info'>
                        <p>Bệnh đi kèm:</p>
                        <div className='comorbidities-action'>
                            <div className='comorbidities-list'>
                                {/* Hiển thị bệnh đi kèm đã chọn */}
                                {selectedComorbidities.map(comorbidity => (
                                    <div
                                        key={comorbidity.id}
                                        className={`comorbidities-item mb-2 ${shakeId === comorbidity.id ? 'shake' : ''}`}
                                    >
                                        <p>{comorbidity.name}</p>
                                        <i 
                                            className="fa-solid me-2 fa-times"
                                            onClick={() => handleRemoveComorbidity(comorbidity.id)}
                                        ></i>
                                    </div>
                                ))}
                            </div>
                            {/* Input tìm kiếm bệnh đi kèm */}
                            <input
                                className='input-add-exam'
                                type='text'
                                placeholder='Nhập triệu chứng...'
                                value={inputComorbidity}
                                onChange={handleInputChange}
                            />
                            {/* Hiển thị danh sách bệnh đi kèm khi có kết quả tìm kiếm */}
                            {inputComorbidity && (
                                <div className='search-results'>
                                    {filteredComorbidities.map(comorbidity => (
                                        <div 
                                            key={comorbidity.id}
                                            className='search-item'
                                            onClick={() => handleSelectComorbidity(comorbidity)}
                                        >
                                            {comorbidity.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='add-exam-footer'>
                    <button className="close-exam-btn" onClick={onClose}>Đóng</button>
                    <button className='add-exam-btn'>Thêm</button>
                </div>
            </div>
        </div>
    );
};

AddExamModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default AddExamModal; 
