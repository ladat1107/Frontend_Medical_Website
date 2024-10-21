import SelectBox2 from "@/components/Selectbox";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Paracdetail.scss'
import { createOrUpdateParaclinical, getAllRoomTypes } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";


const Paracdetail = ({ id, paraclinicalData, onDelete, onSaveResult  }) => {

    const [isNew, setIsNew] = useState(paraclinicalData.isNew || false);
    const [initialparaclinical, setInitialParaclinical] = useState(paraclinicalData);
    const [isChanged, setIsChanged] = useState(false);

    const [paracOptions, setParacOptions] = useState([]);
    const [paraclinical, setParaclinical] = useState(paraclinicalData.paraclinical || 0);
    const [doctorId, setDoctorId] = useState(paraclinicalData.doctorId || 1);
    const [result, setResult] = useState(paraclinicalData.result || '');
    const [description, setDescription] = useState(paraclinicalData.description || '');
    const [image, setImage] = useState(paraclinicalData.image || '');
    const [price, setPrice] = useState(paraclinicalData.price || 0);

    useEffect(() => {
        const isDataChanged = (
            paraclinical !== initialparaclinical.paraclinical ||
            doctorId !== initialparaclinical.doctorId ||
            result !== initialparaclinical.result ||
            description !== initialparaclinical.description ||
            image !== initialparaclinical.image ||
            price !== initialparaclinical.price
        );
        setIsChanged(isDataChanged);
    }, [paraclinical, doctorId, result, description, image, price, initialparaclinical]);

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
        if (!paraclinical || !doctorId || !result || !description || !price) {
            alert('Vui lòng điền đầy đủ thông tin xét nghiệm!');
            return;
        }

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
                onSaveResult(data, true, response.EM);
                setInitialParaclinical(data);
                setIsNew(false);
            } else {
                onSaveResult(data, false, response.EM);
            }
        } catch (error) {
            console.error("Error creating examination:", error.response?.data || error.message);
            onSaveResult(data, false);
        }
    }

    const handleRestoreButton = () => {
        setParaclinical(initialparaclinical.paraclinical);
        setDoctorId(initialparaclinical.doctorId);
        setResult(initialparaclinical.result);
        setDescription(initialparaclinical.description);
        setImage(initialparaclinical.image);
        setPrice(initialparaclinical.price);
    }

    return (
        <>
            <div className="paracdetail-container">
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
                    <div className='col-4 text-end'>
                        <button 
                            className="delete-button" 
                            onClick={() => onDelete(id)}>
                            Xóa
                        </button>
                        {!isNew && (
                            <>
                                <button 
                                    className={`restore-button ${(!isChanged) ? 'disabled' : ''}`}
                                    onClick={handleRestoreButton}
                                    disabled={!isChanged}>
                                    Hoàn tác
                                </button>
                            </>
                        )}
                        <button 
                            className={`save-button ${(!isChanged) ? 'disabled' : ''}`}
                            onClick={handleSaveButton}
                            disabled={!isChanged}>
                            Lưu
                        </button>
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