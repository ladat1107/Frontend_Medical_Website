import { message } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './PayModal.scss';
import { formatCurrency } from '@/utils/formatCurrency';
import { getThirdDigitFromLeft } from '@/utils/numberSeries';
import { updateExamination } from '@/services/doctorService';

const PayModal = ({ isOpen, onClose, onPaySusscess, examId, patientData }) => {

    const [insurance, setInsurance] = useState(
        patientData?.userExaminationData?.userInsuranceData?.insuranceCode || ''
    );
    const [insuranceCoverage, setInsuranceCoverage] = useState(
        patientData?.insuranceCoverage || null
    );

    if (!isOpen || !patientData) return null;

    const special = patientData.special || 'normal';
    const data = patientData;


    const handlePay = async () => {

        let data = {
            id: examId,
            insuranceCoverage: insuranceCoverage || null,
            status: 5
        }

        try{
            let response = await updateExamination(data)
            console.log(response)
            if(response.EC === 0  && response.DT.includes(1)){
                message.success('Cập nhật bệnh nhân thành công');
                onPaySusscess();
                resetForm();
                onClose();
            } else {
              message.error('Cập nhật bệnh nhân thất bại');
            }
        } catch (error) {
            console.log(error)
            message.error('Thêm người dùng thất bại!')
        }
    }

    const resetForm = () => {
        setInsurance('');
        setInsuranceCoverage(null);
    }

    const handleInsuaranceChange = (e) => {
        setInsurance(e.target.value)

        if(e.target.value.length === 10){
            setInsuranceCoverage(getThirdDigitFromLeft(insurance))
        } else {
            setInsuranceCoverage(null)
        }
    }

    const SpecialText = ({special}) => {
        // Xác định className dựa trên giá trị của special
        let specialClass = '';
        let specialText = '';
      
        switch (special) {
          case 'normal':
            specialClass = 'special';
            specialText = 'Không';
            break;
          case 'old':
            specialClass = 'special-old';
            specialText = 'Người già';
            break;
          case 'children':
            specialClass = 'special-children';
            specialText = 'Trẻ em';
            break;
          case 'disabled':
            specialClass = 'special-disabled';
            specialText = 'Người tàn tật';
            break;
          case 'pregnant':
            specialClass = 'special-pregnant';
            specialText = 'P.nữ mang thai';
            break;
          default:
            specialClass = 'special'; // Nếu không có giá trị match, dùng class mặc định
        }
      
        return <p className={`special ${specialClass}`}>{specialText}</p>;
    };

    if (!isOpen) return null;

    return (
        <div className="payment-container">
            <div className="payment-content">
                <div className='payment-header'>
                    Thanh toán tiền khám
                </div>

                <div className='row'>
                    <div className='col-12 d-flex flex-row'>
                        <div className='col-3'>
                            <p style={{fontWeight: "400"}}>Bệnh nhân:</p>
                        </div>
                        <div className='col-8'>
                            <p>{data.userExaminationData.lastName + ' ' + data.userExaminationData.firstName}</p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>CCCD/CMND:</p>
                        </div>
                        <div className='col-3'>
                            <p>{data.userExaminationData.cid}</p>
                        </div>
                        <div className='col-2'/>
                        <div className='col-2 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Ưu tiên:</p>
                        </div>
                        <div className='col-2'>
                            {SpecialText({ special })}
                        </div>
                    </div>
                    <hr className='mt-4'/>
                    <div className='col-12 d-flex flex-row'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Bác sĩ:</p>
                        </div>
                        <div className='col-8'>
                            <p>{data.examinationStaffData.position + ' ' + data.examinationStaffData.staffUserData.lastName + ' ' + data.examinationStaffData.staffUserData.firstName}</p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Mô tả:</p>
                        </div>
                        <div className='col-8'>
                            <p>Khám bệnh hoặc tên xét nghiệm</p>
                        </div>
                    </div>
                    <hr className='mt-4'/>
                    <div className='col-12 d-flex flex-row mt-3 mb-2'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Số BHYT:</p>
                        </div>
                        <div className='col-4'>
                            <input className='input-add-exam' style={{width: "93%"}} maxLength={10}
                                type='text' value={insurance} onChange={handleInsuaranceChange}
                                placeholder='Nhập số BHYT...' />
                        </div>
                        <div className='col-1'/>
                        <div className='col-2 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Mức hưởng:</p>
                        </div>
                        <div className='col-2'>
                            <p>
                                {insuranceCoverage === 0 ? '' : insuranceCoverage}
                            </p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Giá khám:</p>
                        </div>
                        <div className='col-3'>
                            <p>{formatCurrency(data.price)}</p>
                        </div>
                        <div className='col-2'/>
                        <div className='col-2 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Thanh toán:</p>
                        </div>
                        <div className='col-3'>
                            <p>Chưa tính</p>
                        </div>
                    </div>
                </div>

                <div className='payment-footer mt-4'>
                    <button className="close-user-btn" onClick={onClose}>Đóng</button>
                    <button className='payment-btn' onClick={handlePay}>Thêm</button>
                </div>
            </div>
        </div>
    )

}

PayModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPaySusscess: PropTypes.func.isRequired,
    special: PropTypes.string,
    examId: PropTypes.number,
    patientData: PropTypes.object
}

export default PayModal;