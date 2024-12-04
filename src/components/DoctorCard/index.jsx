import React from "react";
import "./doctorCard.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
const DoctorCard = ({ doctor }) => {
  let navigate = useNavigate();
  return (
    <div className="doctor-card" onClick={() => navigate(`${PATHS.HOME.DOCTOR_DETAIL}/${doctor?.examinationStaffData?.staffUserData?.id}`)}>
      <img className="avatar" src={doctor?.examinationStaffData?.staffUserData?.avatar} alt={`${doctor?.examinationStaffData?.staffUserData?.firstName} avatar`} />
      <div className="line">
        <div className="rating-right">
          <span>Đánh giá : {5} ⭐</span>
        </div>
        <div className="rating-left">
          <span>Lượt khám : {doctor?.examinationsCount} 👤 </span>
        </div>
      </div>
      <div className="info">
        <p className="major" >{doctor?.examinationStaffData?.position}</p>
        <h3 className="name">{doctor?.examinationStaffData?.staffUserData?.firstName}</h3>
        <p className="specialty">🩺 {doctor?.examinationStaffData?.staffDepartmentData?.name}</p>

        <div className="price">
          Giá khám: <span>{formatCurrency(doctor?.examinationStaffData?.price)}</span>
        </div>
      </div>
      <div className="btn-explore">Tư Vấn Ngay</div>
    </div>
  );
};

export default DoctorCard;
