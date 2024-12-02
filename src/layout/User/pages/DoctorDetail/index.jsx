import React from "react";
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import Container from "@/components/Container";
import DoctorDetailHeader from "./DoctorDetailHeader";
import DoctorDetailBody from "./DoctorDetailBody";
import DoctorDetailRelated from "./DoctorDetailRelated";



const DoctorDetail = () => {
  return (
    <div className={cx('bg')} >
      <Container>
         <DoctorDetailHeader/>
         <DoctorDetailBody/>
         <DoctorDetailRelated/>
        
      </Container>
    </div>
  );
};

export default DoctorDetail;
