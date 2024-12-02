import React from "react";
import "./doctorCard.scss";
import { formatCurrency } from "@/utils/formatCurrency";

           
const DoctorCard = ({doctor}) => {
  return (
    <div className="doctor-card">
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
        <p className="major" >{doctor?.position}</p>
        <h3 className="name">{doctor?.examinationStaffData?.staffUserData?.firstName}</h3>
        <p className="specialty">🩺 {"Khoa Nội"}</p>
        
        <div className="price">
          Giá khám: <span>{formatCurrency(500)}</span>
        </div>
      </div>
      <div className="btn-explore">Tư Vấn Ngay</div>
    </div>
  );
};

export default DoctorCard;
