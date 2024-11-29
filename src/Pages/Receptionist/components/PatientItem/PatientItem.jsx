import React from 'react';
import PropTypes from 'prop-types';
import { cutSuffix } from '@/utils/numberSeries';
import { updateExamination } from '@/services/doctorService';
import { message } from 'antd';
import './PatientItem.scss';

const PatientItem = ({ index, id, name, symptom, special, doctor, room, visit_status, downItem}) => {

    const handleDownItem = async () => {
        try{
          const data = {
            id: id,
            visit_status: 1,
          }
          const response = await updateExamination(data);

          if(response.EC === 0  && response.DT.includes(1)){
            message.success('Chuyển bệnh nhân thành công');
            downItem();
          } else {
            message.error('Chuyển bệnh nhân thất bại');
          }
        } catch (error) {
          console.error("Error:", error);
          message.error('Chuyển bệnh nhân thất bại');
        }
    }

    const SpecialText = ({ special }) => {
        // Xác định className dựa trên giá trị của special
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
            specialClass = 'special'; // Nếu không có giá trị match, dùng class mặc định
        }
      
        return <p className={`special ${specialClass}`}>{specialText}</p>;
    };

    return (
        <div className="patient-item mt-2 row">
            <div className="col-1">
                <p>{index}</p>
            </div>
            <div className="col-3">
                <p className="bold-text">{name}</p>
                <p className="sub-text">Triệu chứng: {symptom}</p>
            </div>
            <div className="col-2 d-flex justify-content-center">
                {SpecialText({ special })}
            </div>
            <div className="col-2">
                <p className="bold-text">Bác sĩ</p>
                <p className="sub-text">{doctor}</p>
            </div>
            <div className="col-3">
                <p className="bold-text">Phòng khám bệnh</p>
                <p className="sub-text">{cutSuffix(room)}</p>
            </div>
            <div className="col-1 d-flex justify-content-end">
              {visit_status === 0 && (
                <i className="fa-solid fa-forward-fast fa-rotate-90 color-down" onClick={handleDownItem}></i>
              )}
              {/* {visit_status === 1 && (
                <i className="fa-solid fa-forward-fast fa-rotate-270 color-up"></i>
              )} */}
            </div>
        </div>
    );
};
PatientItem.propTypes = {
    index: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    symptom: PropTypes.string,
    special: PropTypes.string,
    doctor: PropTypes.string,
    room: PropTypes.string,
    visit_status: PropTypes.number,
    downItem: PropTypes.func,
};
export default PatientItem;