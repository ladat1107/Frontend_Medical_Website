import React from 'react';
import { FaDollarSign, FaUserCheck, FaStar, FaStethoscope } from 'react-icons/fa';
import './doctorCard.scss';

const DoctorCard = ({ avatar, name, specialty, price, visits, rating }) => {
    const avtTest = 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fmedpro-production%2Fdigimed%2Fdoctors%2F1712976261086-BS_THUY_VAN.png&w=1920&q=75'
  return (
    <div className="doctor-card">
      <img src={avtTest} alt={`${name}'s avatar`} className="doctor-card__avatar" />
      <div className="doctor-card__info">
        <h3 className="doctor-card__name">{name}</h3>
        <p className="doctor-card__specialty" style={{display:"flex", alignItems:"center", gap:"10px"}} >
          <FaStethoscope className="doctor-card__icon" /> {specialty}
        </p>
        <div className="doctor-card__details">
          <p className="doctor-card__price" style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <FaDollarSign className="doctor-card__icon" /> Giá khám: {price}₫
          </p>
          <p className="doctor-card__visits" style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <FaUserCheck className="doctor-card__icon" /> Lượt khám: {visits}
          </p>
          <p className="doctor-card__rating" style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <FaStar className="doctor-card__icon" /> Đánh giá: {rating} ⭐
          </p>
        </div>
        <div className='btn-booking' >Đặt khám ngay</div>
      </div>
    </div>
  );
};

export default DoctorCard;
