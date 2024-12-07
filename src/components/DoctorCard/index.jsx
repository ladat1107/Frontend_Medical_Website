import React from "react";
import "./doctorCard.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
const DoctorCard = ({ doctor }) => {
  let navigate = useNavigate();
  return (
    <div className="doctor-card" onClick={() => navigate(`${PATHS.HOME.DOCTOR_DETAIL}/${doctor?.staffUserData?.id}`)}>
      <img className="avatar" src={doctor?.staffUserData?.avatar} alt={`${doctor?.staffUserData?.firstName} avatar`} />
      <div className="line">
        <div className="rating-right">
          <span>Đánh giá : {5} ⭐</span>
        </div>
        <div className="rating-left">
          <span>Lượt khám : {doctor?.examinationsCount?.length || 0} 👤 </span>
        </div>
      </div>
      <div className="info">
        <p className="major" >{doctor?.position}</p>
        <h3 className="name">{doctor?.staffUserData?.firstName}</h3>
        <p className="specialty">🩺 {doctor?.staffDepartmentData?.name}</p>

        <div className="price">
          Giá khám: <span>{formatCurrency(doctor?.price || 0)}</span>
        </div>
      </div>
      <div className="btn-explore">Tư Vấn Ngay</div>
    </div>
  );
};

export default DoctorCard;
