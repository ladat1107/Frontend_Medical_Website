import React from "react";
import "./doctorCard.scss";
import { formatCurrency } from "@/utils/formatCurrency";

const DoctorCard = ({ doctor }) => {
  
  const  avatar = "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc2f6108e-b22b-45cc-879b-fb8a7f33cd87-bs_nguyaaan_thaaa_sen.png&w=384&q=75"
  const  name = "canh minh"
  const specialty = "khoa nội"
  const rating = 4
  const visits = 20
  const price = 100000  
  

  return (
    <div className="doctor-card">
      <img className="avatar" src={avatar} alt={`${name} avatar`} />
      <div className="line">
          <div className="rating-right">
            <span>Đánh giá : {rating} ⭐</span>
          </div>
          <div className="rating-left">
            <span>Lượt khám : {visits} 👤 </span>
          </div>
        </div>
      <div className="info">
        <p className="major" >BSCKI</p>
        <h3 className="name">{name}</h3>
        <p className="specialty">🩺 {specialty}</p>
        
        <div className="price">
          Giá khám: <span>{formatCurrency(price)}</span>
        </div>
      </div>
      <div className="btn-explore">Tư Vấn Ngay</div>
    </div>
  );
};

export default DoctorCard;
