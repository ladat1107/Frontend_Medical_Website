import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";

const OurServices = () => {
  return (
   <section className="ourService">
     
      <h2 className="title">Dịch Vụ Nổi Bật Tại Bệnh Viện</h2>
      <div className="container-service">
        <div className="card">
          <FontAwesomeIcon icon={faUserDoctor} size="3x" className="icon-doctor"/>
          <div className="card-details">
            <p className="text-body">Đặt lịch khám online</p>
          </div>
          <button className="card-button">More info</button>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faUserDoctor} size="3x" className="icon-doctor"/>
          <div className="card-details">
            <p className="text-body">Đặt lịch khám online</p>
          </div>
          <button className="card-button">More info</button>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faUserDoctor} size="3x" className="icon-doctor"/>
          <div className="card-details">
            <p className="text-body">Đặt lịch khám online</p>
          </div>
          <button className="card-button">More info</button>
        </div>
      </div>
    
   </section>
  );
};

export default OurServices;
