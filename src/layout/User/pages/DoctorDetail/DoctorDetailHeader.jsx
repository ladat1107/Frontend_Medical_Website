import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
const DoctorDetailHeader = () => {
  return (
    <div className={cx('doctor-header')} >
      <Breadcrumb style={{ marginBottom: "30px", fontSize: "18px", color: "#555", fontWeight:"700" }}>
  <Breadcrumb.Item>
    <Link to={""} style={{ color: "#007bff", textDecoration: "none" }}>
      Home
    </Link>
  </Breadcrumb.Item>
  <Breadcrumb.Item>
    <Link to={""} style={{ color: "#007bff", textDecoration: "none" }}>
      Doctor Detail
    </Link>
  </Breadcrumb.Item>
  <Breadcrumb.Item
    style={{
      fontWeight: "bold",
      color: "#000",
    }}
  >
    {"La Tiến Đạt"}
  </Breadcrumb.Item>
</Breadcrumb>


      <div className={cx("wrapper")}>
        <div className={cx("doctor-header-top")}>
            <div className={cx('doctor-avt')} >
                <img src="https://cdn.medpro.vn/prod-partner/aada3327-8cd3-4170-8213-30a3e3716395-bs_phan_baa_haa_.png?w=1920&q=75" alt="" />
            </div>
            <div className={cx('doctor-info')} >
                <h4 className={cx('doctor-info-title')} >
                    Bác Sĩ La Tiến Đạt
                </h4>
                <div className={cx('doctor-info-content')} >
                  <div className={cx('style-info')} >  
                          <label htmlFor="">Chuyên Khoa</label>
                          <span>Nội Khoa</span>
                  </div>
                  <div className={cx('style-info')} >  
                          <label htmlFor="">Chuyên Trị</label>
                          <span>Nội Khoa - Tiêu Hóa</span>
                  </div>
                  <div className={cx('style-info')} >  
                          <label htmlFor="">Gía Khám</label>
                          <span>150.000</span>
                  </div>
                  <div className={cx('style-info')} >  
                          <label htmlFor="">Lịch Khám</label>
                          <span>Hẹn Khám</span>
                  </div>
                  
                </div>
            </div>
        </div>
        <div className={cx("doctor-header-bottom")}>
            <div className={cx('address')} >
                <div className={cx('icon')} >
                <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" class="styles_linear-location__OUB8h" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div className='text' >
                    Bác sĩ chuyên khoa <br />
                    Tư vấn online tại website
                </div>
            </div>

            <div className={cx('booking-btn')} >
                Đặt khám ngay
            </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailHeader;
