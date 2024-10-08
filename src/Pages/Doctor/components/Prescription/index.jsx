import './Prescription.scss';

const Prescription = () => {

    return (
        <>
            <div className="pres-container">
                <div className="row">
                    <div className='col-2'>
                        <button className='add-button'>Thêm thuốc</button>
                    </div>
                    <div className='col-2'>
                        <button className='save-button'>Lưu</button>
                    </div>
                </div>
                <div className="row">
                    <div className='col-2'>
                        <p className='title'>Ghi chú:</p>
                    </div>
                    <div className='col-10'>
                        <input type="text" className="input" placeholder="Nhập ghi chú"/>
                    </div>
                </div>
                <div className="row">
                    <div className='col-2'>
                        <p className='title'>Tổng chi phí:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>0 VND</p>
                    </div>
                </div>
                <div className="row">
                    <div className='col-2'>
                        <p className='title'>BHYT thanh toán:</p>
                    </div>
                    <div className='col-10'>
                        <p className='payment'>0 VND</p>
                    </div>
                </div>
                <hr />
                <div className="row">
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