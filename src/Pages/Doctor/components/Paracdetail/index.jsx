import SelectBox2 from "@/components/Selectbox";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Paracdetail.scss'
import { getAllRoomTypes } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";


const Paracdetail = ({ onDelete }) => {

    const [paracOptions, setParacOptions] = useState([]);
    const [paracPrice, setParacPrice] = useState(0);

    useEffect(() => {
        fetchParaclinical();
    }, []);

    let {
        data: dataParaclinicals,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchParaclinical,
    } = useMutation((query) => 
        getAllRoomTypes()  
    );

    useEffect(() => {
        if (dataParaclinicals && dataParaclinicals.DT) {
            const paracOptions = dataParaclinicals.DT.map(item => ({
                value: item.id,
                label: item.name,
                price: item.price,
            }));
            setParacOptions(paracOptions);
        }        
    }, [dataParaclinicals]);

    const handleParacChange = (value) => {
        const selectedParac = paracOptions.find(paracOptions => paracOptions.value === value);
        if (selectedParac) {
            setParacPrice(selectedParac.price || 0);  // Cập nhật giá thuốc
        }
    };

    return (
        <>
            <div className="parac-container">
                <div className="row">
                    <div className="col-2">
                        <p>Loại xét nghiệm:</p>
                    </div>
                    <div className="col-4">
                        <SelectBox2
                            className="select-box2"
                            options={paracOptions}
                            placeholder="Nhập loại xét nghiệm"
                            onChange={handleParacChange}
                        />
                    </div>
                    <div className="col-2">
                        <p>Bác sĩ thực hiện:</p>
                    </div>
                    <div className="col-4">
                        <p className="info">Bác sĩ A</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Kết quả:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Nhập kết quả xét nghiệm"/>
                    </div>
                    <div className="col-2">
                        <p>Mô tả:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Mô tả chi tiết kết quả"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Hình ảnh:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" className="input" placeholder="Thêm hình ảnh"/>
                    </div>
                    <div className="col-2">
                        <p>Giá</p>
                    </div>
                    <div className="col-4">
                        <p className="info">{paracPrice.toLocaleString()} VND</p>
                    </div>
                </div>
                <div className="row padding0">
                    <div className='col-8'></div>
                    <div className='col-2'>
                        <button className="delete-button" onClick={onDelete}>Xóa</button>
                    </div>
                    <div className='col-2'>
                        <button className="save-button">Lưu</button>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
Paracdetail.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default Paracdetail;