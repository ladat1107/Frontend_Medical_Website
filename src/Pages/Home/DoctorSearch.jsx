import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmbulance } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const DoctorSearch = () => {
  return (
    <>
      <div className="doctor-search-container">
        <div className="item-doctor-search">
          <FontAwesomeIcon icon={faAmbulance} className="ambulance-icon" />
          <h4 className="title">Cấp Cứu</h4>
          <span></span>
          <div className="content">Gọi ngay  : (028) 38966894</div>
        </div>
        <div className="item-doctor-search">
          <FontAwesomeIcon icon={faAmbulance} className="ambulance-icon" />
          <h4 className="title">Giờ làm việc</h4>
          <span></span>
          <div className="content">
            <p> Thứ 2 - Thứ 6</p>
            Sáng: 7 giờ - 12 giờ <br /> Chiều: 13 giờ - 16 giờ
          </div>
        </div>
        <div className="item-doctor-search">
          <FontAwesomeIcon icon={faAmbulance} className="ambulance-icon" />
          <h4 className="title">Bác sĩ</h4>
          <span></span>
          <div className="content">
            <button>Tìm Bác Sĩ</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorSearch;
