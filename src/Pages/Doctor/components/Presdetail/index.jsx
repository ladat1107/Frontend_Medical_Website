import React, { useState } from 'react';
import './Presdetail.scss';
import SelectBox2 from '@/components/Selectbox';
import PropTypes from 'prop-types';

const Presdetail = ({ onDelete, options }) => {
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [medicineUnit, setMedicineUnit] = useState('Đơn vị');

    const handleMedicineChange = (value) => {
        const selectedMedicine = options.find(option => option.value === value);
        if (selectedMedicine) {
            setSelectedPrice(selectedMedicine.price || 0);  // Cập nhật giá thuốc
            setMedicineUnit(selectedMedicine.unit || '');  // Cập nhật đơn vị thuốc
        }
    };

    return (
        <div className="presdetail-container">
            <div className="row center-content">
                <div className='col-3'>
                    <div className='row'>
                        <p className='info'>Thành phần hoạt tính</p>
                    </div>
                    <div className='row'>
                        <SelectBox2
                            className="select-box2"
                            options={options}
                            placeholder="Nhập tên thuốc"
                            onChange={handleMedicineChange} 
                        />
                    </div>
                </div>
                <div className='col-2'>
                    <div className='row'>
                        <p className='title'>Số lượng</p>
                    </div>
                    <div className='row'>
                        <input type="text" className="input" placeholder="Nhập số lượng"/>
                    </div>
                </div>
                <div className='col-1'>
                    <div className='row'>
                        <p className='title'>Đơn vị</p>
                    </div>
                    <div className='row'>
                        <p className='suptext'>{medicineUnit}</p>
                    </div>
                </div>
                <div className='col-1'>
                    <div className='row'>
                        <p className='title'>Giá</p>
                    </div>
                    <div className='row'>
                        <p className='suptext'>{selectedPrice.toLocaleString()}</p>  {/* Hiển thị giá */}
                    </div>
                </div>
                <div className='col-3'>
                    <div className='row'>
                        <p className='title'>Liều dùng</p>
                    </div>
                    <div className='row'>
                        <input type="text" className="input" placeholder="Nhập liều dùng"/>
                    </div>
                </div>
                <div className='col-1'>
                    <i className="fa-solid fa-trash red" onClick={onDelete}></i>
                </div>
            </div>
        </div>
    );
};

Presdetail.propTypes = {
    onDelete: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
};

export default Presdetail;