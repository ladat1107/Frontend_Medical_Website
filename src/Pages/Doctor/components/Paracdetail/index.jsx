import SelectBox2 from "@/components/Selectbox";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Paracdetail.scss'
import { createOrUpdateParaclinical, getAllRoomTypes } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";


const Paracdetail = ({ id, paraclinicalData, onDelete, onSaveResult  }) => {

    const [paracOptions, setParacOptions] = useState([]);

    const [paraclinical, setParaclinical] = useState(paraclinicalData.paraclinical || 0);
    const [doctorId, setDoctorId] = useState(paraclinicalData.doctorId || 1);
    const [result, setResult] = useState(paraclinicalData.result || '');
    const [description, setDescription] = useState(paraclinicalData.description || '');
    const [image, setImage] = useState(paraclinicalData.image || '');
    const [price, setPrice] = useState(paraclinicalData.price || 0);

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
            setPrice(selectedParac.price || 0);  // Cập nhật giá xét nghiệm
            setParaclinical(selectedParac.value);
        }
    };

    const handleResultChange = (e) => {
        setResult(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleImageChange = (e) => {
        setImage(e.target.value);
    }

    const handleSaveButton = async () => {
        const data = {
            id: id,
            examinationId: paraclinicalData.examinationId,
            paraclinical: paraclinical,
            doctorId: doctorId,
            result: result,
            description: description,
            image: image,
            price: price,
        }

        try{
            const response = await createOrUpdateParaclinical(data);
            if (response && response.EC === 0 && response.DT === true) { 
                onSaveResult(data, true);
            } else {
                onSaveResult(data, false);
            }
        } catch (error) {
            console.error("Error creating examination:", error.response?.data || error.message);
            onSaveResult(data, false);
        }
    }

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
                            value={paraclinical !== 0 ? paraclinical : undefined}
                            options={paracOptions}
                            placeholder="Nhập loại xét nghiệm"
                            onChange={handleParacChange}
                        />
                    </div>
                    <div className="col-2">
                        <p>Bác sĩ thực hiện:</p>
                    </div>
                    <div className="col-4">
                        <p className="info">{doctorId}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Kết quả:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                            className="input" 
                            value={result}
                            onChange={handleResultChange}
                            placeholder="Nhập kết quả xét nghiệm"/>
                    </div>
                    <div className="col-2">
                        <p>Mô tả:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                        className="input" 
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Mô tả chi tiết kết quả"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Hình ảnh:</p>
                    </div>
                    <div className="col-4">
                        <input type="text" 
                        className="input" 
                        value={image}
                        onChange={handleImageChange}
                        placeholder="Thêm hình ảnh"/>
                    </div>
                    <div className="col-2">
                        <p>Giá</p>
                    </div>
                    <div className="col-4">
                        <p className="info">{price.toLocaleString()} VND</p>
                    </div>
                </div>
                <div className="row padding0">
                    <div className='col-8'></div>
                    <div className='col-2'>
                        <button className="delete-button" onClick={() => onDelete(id)}>Xóa</button>
                    </div>
                    <div className='col-2'>
                        <button 
                            onClick={handleSaveButton}
                            className="save-button">Lưu</button>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
Paracdetail.propTypes = {
    id: PropTypes.number.isRequired,
    paraclinicalData: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSaveResult: PropTypes.func.isRequired,
};

export default Paracdetail;