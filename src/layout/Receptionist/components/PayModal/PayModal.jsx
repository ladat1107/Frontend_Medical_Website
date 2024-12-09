import { message } from 'antd';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import { getThirdDigitFromLeft } from '@/utils/numberSeries';
import { updateExamination, updateParaclinical } from '@/services/doctorService';
import './PayModal.scss';

const PayModal = ({ isOpen, onClose, onPaySusscess, examId, type, patientData }) => {
    const [insurance, setInsurance] = useState('');
    const [insuranceCoverage, setInsuranceCoverage] = useState(null);
    const [special, setSpecial] = useState('normal');
    const [data, setData] = useState({
        infouser: { firstName: '', lastName: '', cid: '' },
        infostaff: { firstName: '', lastName: '', position: '' },
        price: 0,
        description: ''
    });

    

    // Use useEffect to set initial data when component mounts or patientData changes
    useEffect(() => {
        if (!isOpen || !patientData) return;

        let newSpecial = 'normal';
        let newData = {};

        if (type === 'examination') {
            newSpecial = patientData?.special || 'normal';
            newData = {
                infouser: {
                    firstName: patientData?.userExaminationData?.firstName,
                    lastName: patientData?.userExaminationData?.lastName,
                    cid: patientData?.userExaminationData?.cid,
                },
                infostaff: {
                    firstName: patientData?.examinationStaffData?.staffUserData?.firstName,
                    lastName: patientData?.examinationStaffData?.staffUserData?.lastName,
                    position: patientData?.examinationStaffData?.position,
                },
                price: patientData?.examinationStaffData?.price,
                description: 'Khám bệnh',
            };

            setInsurance(patientData?.insuaranceCode || '');
            setInsuranceCoverage(patientData?.insuranceCoverage || null);
        } else {
            newSpecial = patientData?.examinationResultParaclincalData?.special || 'normal';
            newData = {
                infouser: {
                    firstName: patientData?.examinationResultParaclincalData?.userExaminationData?.firstName,
                    lastName: patientData?.examinationResultParaclincalData?.userExaminationData?.lastName,
                    cid: patientData?.examinationResultParaclincalData?.userExaminationData?.cid,
                },
                infostaff: {
                    firstName: patientData?.doctorParaclinicalData?.staffUserData?.firstName,
                    lastName: patientData?.doctorParaclinicalData?.staffUserData?.lastName,
                    position: patientData?.doctorParaclinicalData?.position,
                },
                price: patientData?.price,
                description: patientData?.paracName,
            };

            setInsurance(patientData?.examinationResultParaclincalData?.insuaranceCode || '');
            setInsuranceCoverage(patientData?.examinationResultParaclincalData?.insuranceCoverage || null);
        }

        setSpecial(newSpecial);
        setData(newData);
    }, [isOpen, patientData, type]);

    useEffect(() => {
        // Thêm logic ngăn cuộn trang khi modal mở
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup effect khi component unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePay = async () => {
        try {
            let paymentData = {};

            if(type === 'examination') {
                paymentData = {
                    id: examId,
                    insuranceCoverage: insuranceCoverage || null,
                    insuaranceCode: insurance,
                    status: 5
                };

                const response = await updateExamination(paymentData);
    
                if (response.EC === 0 && response.DT.includes(1)) {
                    message.success('Cập nhật bệnh nhân thành công!');
                    onPaySusscess();
                    resetForm();
                    onClose();
                } else {
                    message.error('Cập nhật bệnh nhân thất bại!');
                }
            } else if (type === 'paraclinical') {
                paymentData = {
                    id: examId,
                    status: 5
                };

                const response = await updateParaclinical(paymentData);
    
                if (response.EC === 0 && response.DT.includes(1)) {
                    message.success('Cập nhật bệnh nhân thành công!');
                    onPaySusscess();
                    resetForm();
                    onClose();
                } else {
                    message.error('Cập nhật bệnh nhân thất bại!');
                }
            }
        
        } catch (error) {
            console.log(error);
            message.error('Cập nhật bệnh nhân thất bại!');
        }
    };

    const resetForm = () => {
        setInsurance('');
        setInsuranceCoverage(null);
    };

    const handleInsuaranceChange = (e) => {
        const newInsurance = e.target.value;
        setInsurance(newInsurance);

        if (newInsurance.length === 10) {
            setInsuranceCoverage(getThirdDigitFromLeft(newInsurance));
        } else {
            setInsuranceCoverage(null);
        }
    };

    const SpecialText = ({ special }) => {
        let specialClass = '';
        let specialText = '';
      
        switch (special) {
            case 'normal':
                specialClass = 'special';
                specialText = '';
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
                specialClass = 'special';
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
                            <p>{data.infouser.lastName + ' ' + data.infouser.firstName}</p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>CCCD/CMND:</p>
                        </div>
                        <div className='col-3'>
                            <p>{data.infouser.cid}</p>
                        </div>
                        <div className='col-1'/>
                        <div className='col-2 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Ưu tiên:</p>
                        </div>
                        <div className='col-3'>
                            {SpecialText({ special })}
                        </div>
                    </div>
                    <hr className='mt-4'/>
                    <div className='col-12 d-flex flex-row'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Bác sĩ:</p>
                        </div>
                        <div className='col-8'>
                            <p>{data.infostaff.position + ' ' + data.infostaff.lastName + ' ' + data.infostaff.firstName}</p>
                        </div>
                    </div>
                    <div className='col-12 d-flex flex-row mt-3'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Mô tả:</p>
                        </div>
                        <div className='col-8' style={{color: "#008EFF", fontWeight: '600'}}>
                            <p>{data.description}</p>
                        </div>
                    </div>
                    <hr className='mt-4'/>
                    <div className='col-12 d-flex flex-row mt-3 mb-2'>
                        <div className='col-3 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Số BHYT:</p>
                        </div>
                        <div className='col-3'>
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
                        <div className='col-1'/>
                        {/* <div className='col-2 d-flex align-items-center'>
                            <p style={{fontWeight: "400"}}>Thanh toán:</p>
                        </div>
                        <div className='col-3'>
                            <p>Chưa tính</p>
                        </div> */}
                    </div>
                </div>
                <div className='payment-footer mt-4'>
                    <button className="close-user-btn" onClick={onClose}>Đóng</button>
                    <button className='payment-btn' onClick={handlePay}>Hoàn thành</button>
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
    patientData: PropTypes.object,
    type: PropTypes.string
}

export default PayModal;