import './Prescription.scss';
import Presdetail from '../Presdetail';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@/hooks/useMutation';
import { getAllMedicinesForExam } from '@/services/doctorService';

const Prescription = () => {

    const [presDetails, setPresDetails] = useState([{ id: 0, quantity: 0, price: 0 }]);
    const [medicineOptions, setMedicineOptions] = useState([]);

    const [prescriptionPrice, setPrescriptionPrice] = useState(0);
    const [technicalServicePrice, setTechnicalServicePrice] = useState(0);
    const [bhytPayment, setBhytPayment] = useState(0);
    const [patientPayment, setPatientPayment] = useState(0);

    let {
        data: dataMedicines,
        loading: comorbiditiesLoading,
        error: comorbiditiesError,
        execute: fetchMedicines,
    } = useMutation((query) => 
        getAllMedicinesForExam()  
    );

    useEffect(() => {
        fetchMedicines();
    }, []);

    useEffect(() => {
        if (dataMedicines && dataMedicines.DT) {
            const medicineOptions = dataMedicines.DT.map(item => ({
                value: item.id,
                label: item.name,
                price: item.price, 
                unit: item.unit,
            }));
            setMedicineOptions(medicineOptions);
        }        
    }, [dataMedicines]);

    const handleAddPresdetail = useCallback(() => {
        setPresDetails(prevDetails => [
            ...prevDetails,
            { id: prevDetails.length > 0 ? Math.max(...prevDetails.map(d => d.id)) + 1 : 0, quantity: 0, price: 0 }
        ]);
    }, []);

    const handleDeletePresdetail = useCallback((id) => {
        setPresDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    }, []);

    const handlePresdetailChange = useCallback((id, quantity, price) => {
        setPresDetails(prevDetails => 
            prevDetails.map(detail => 
                detail.id === id ? { ...detail, quantity, price } : detail
            )
        );
        console.log(presDetails);
    }, []);

    useEffect(() => {
        const totalPrice = presDetails.reduce((sum, detail) => sum + detail.quantity * detail.price, 0);
        setPrescriptionPrice(totalPrice);
    }, [presDetails]);

    return (
        <>
            <div className="pres-container">
                <div className="row padding">
                    <div className='col-2'>
                        <button className='add-button' onClick={handleAddPresdetail}>Thêm thuốc</button>
                    </div>
                    <div className='col-2'>
                        <button className='save-button'>Lưu</button>
                    </div>
                </div>
                <div className="row padding gap">
                {presDetails.length > 0 ? (
                    presDetails.map(detail => (
                        <Presdetail 
                            key={detail.id} 
                            id={detail.id}
                            options={medicineOptions}
                            onDelete={() => handleDeletePresdetail(detail.id)}
                            onChange={handlePresdetailChange}
                        />
                    ))
                ) : (
                    <div className="empty-list-message">
                        <div>Đơn thuốc trống</div>
                        <hr />
                    </div>
                )}
                </div>
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Ghi chú:</p>
                    </div>
                    <div className='col-10'>
                        <input type="text" className="input" placeholder="Nhập ghi chú"/>
                    </div> 
                </div>
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Chi phí thuốc:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>{prescriptionPrice.toLocaleString()} VND</p>
                    </div>
                </div>
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Dịch vụ kỹ thuật:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>0 VND</p>
                    </div>
                </div>
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>BHYT thanh toán:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>0 VND</p>
                    </div>
                </div>
                <hr />
                <div className="row padding">
                    <div className='col-2'>
                        <p className='title'>Người bệnh trả:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>0 VND</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Prescription;