import './Prescription.scss';
import Presdetail from '../Presdetail';
import { useCallback, useState } from 'react';

const Prescription = () => {

    const [presDetails, setPresDetails] = useState([{ id: 0 }]);

    const handleAddPresdetail = useCallback(() => {
        setPresDetails(prevDetails => [
            ...prevDetails,
            { id: prevDetails.length > 0 ? Math.max(...prevDetails.map(d => d.id)) + 1 : 0 }
        ]);
    }, []);

    const handleDeletePresdetail = useCallback((id) => {
        setPresDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    }, []);

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
                            onDelete={() => handleDeletePresdetail(detail.id)} 
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
                        <p className='payment'>0 VND</p>
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