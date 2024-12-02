import SelectBox2 from "@/layout/Doctor/components/Selectbox";
import { Form, message, Progress } from 'antd';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Paracdetail.scss'
import { createOrUpdateParaclinical, getAllRoomTypes, getStaffNameById } from "@/services/doctorService";
import { useMutation } from "@/hooks/useMutation";
import { CloudUploadOutlined } from '@ant-design/icons';
import { CLOUDINARY_FOLDER } from "@/constant/value";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";


const Paracdetail = ({ id, paraclinicalData, onDelete, onSaveResult }) => {
    const [isNew, setIsNew] = useState(paraclinicalData.isNew || false);
    const [initialparaclinical, setInitialParaclinical] = useState(paraclinicalData);
    const [isChanged, setIsChanged] = useState(false);

    const [paracOptions, setParacOptions] = useState([]);
    const [paraclinical, setParaclinical] = useState(paraclinicalData.paraclinical || 0);
    const [doctorId, setDoctorId] = useState(paraclinicalData.doctorId || 0);
    const [result, setResult] = useState(paraclinicalData.result || '');
    const [description, setDescription] = useState(paraclinicalData.description || '');
    const [image, setImage] = useState(paraclinicalData.image || '');
    const [price, setPrice] = useState(paraclinicalData.price || 0);

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [doctorName, setDoctorName] = useState('');

    let {
        data: doctorNameData,
        loading: doctorNameLoading,
        error: doctorNameError,
        execute: fetchDoctorName,
    } = useMutation((query) => getStaffNameById(doctorId));

    useEffect(() => {
        fetchDoctorName();
        fetchParaclinical();
    }, []);

    useEffect(() => {
        if (doctorNameData && doctorNameData.DT) {
            console.log(doctorNameData.DT);
            setDoctorName(doctorNameData.DT.staffUserData.lastName + ' ' + doctorNameData.DT.staffUserData.firstName);
        }
    }, [doctorNameData]);

    useEffect(() => {
        const isDataChanged = (
            paraclinical !== initialparaclinical.paraclinical ||
            result !== initialparaclinical.result ||
            description !== initialparaclinical.description ||
            image !== initialparaclinical.image ||
            price !== initialparaclinical.price
        );
        setIsChanged(isDataChanged);
    }, [paraclinical, result, description, image, price, initialparaclinical]);



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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); // Bắt đầu upload
        setUploadProgress(0); // Đặt lại tiến trình về 0
        try {
            // Gọi hàm upload với callback để cập nhật tiến trình
            const url = await uploadToCloudinary(file, CLOUDINARY_FOLDER.DEPARTMENT, (progress) => {
                setUploadProgress(progress);
            });
            setImage(url); // Cập nhật ảnh
            message.success("Upload thành công!");
        } catch (error) {
            message.error("Upload thất bại. Vui lòng thử lại.");
            console.error(error);
        } finally {
            setUploading(false); // Kết thúc upload
        }
    };

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

        try {
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
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Loại xét nghiệm:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-4">
                        <SelectBox2
                            className="select-box2"
                            value={paraclinical !== 0 ? paraclinical : undefined}
                            options={paracOptions}
                            placeholder="Nhập loại xét nghiệm"
                            onChange={handleParacChange}
                        />
                    </div>
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Bác sĩ thực hiện:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-4">
                        <p className="info">{doctorName}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Kết quả:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-4">
                        <input type="text"
                            className="input"
                            value={result}
                            onChange={handleResultChange}
                            placeholder="Nhập kết quả xét nghiệm" />
                    </div>
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Mô tả:</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-4">
                        <input type="text"
                            className="input"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Mô tả chi tiết kết quả" />
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-12 mt-3 col-lg-2">
                        <p className="text-start">Hình ảnh:</p>
                    </div>
                    <div className="col-12 mt-3 col-lg-4">
                        <Form.Item>
                            <div className='image-upload'>
                                <div className='container'>
                                    <span className='image-cloud'><CloudUploadOutlined /></span>
                                    <div style={{ cursor: 'pointer' }} onClick={() => document.getElementById(`input-upload-${id}`).click()}>
                                        <span htmlFor={`input-upload-${id}`} className='input-upload'>
                                            Chọn ảnh
                                        </span> đăng tải.
                                    </div>
                                    {uploading && (
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <Progress percent={uploadProgress} status="active" />
                                        </div>
                                    )}
                                    {image && (
                                        <div>
                                            <img src={image} alt="Uploaded" style={{ width: "100%" }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <input type="file" id={`input-upload-${id}`} hidden={true} onChange={handleImageChange} />
                        </Form.Item>
                    </div>
                    <div className="col-5 mt-3 col-lg-2">
                        <p>Giá</p>
                    </div>
                    <div className="col-7 mt-3 col-lg-4">
                        <p className="info">{price.toLocaleString()} VND</p>
                    </div>
                </div>
                <div className="row">
                    <div className='col-0 col-lg-7'></div>
                    <div className='col-12 col-lg-5'>
                        <div className="row">
                            <div className="col-4 padding5">
                                <button
                                    className="delete-button"
                                    onClick={() => onDelete(id)}>
                                    Xóa
                                </button>
                            </div>
                            {!isNew && (
                                <>
                                    <div className="col-4 padding5">
                                        <button
                                            className={`restore-button ${(!isChanged) ? 'disabled' : ''}`}
                                            onClick={handleRestoreButton}
                                            disabled={!isChanged}>
                                            Hoàn tác
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="col-4 padding5">
                                <button
                                    className={`save-button ${(!isChanged) ? 'disabled' : ''}`}
                                    onClick={handleSaveButton}
                                    disabled={!isChanged}>
                                    Lưu
                                </button>
                            </div>
                        </div>
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