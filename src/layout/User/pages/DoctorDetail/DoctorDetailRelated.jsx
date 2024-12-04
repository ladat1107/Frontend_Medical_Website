

import React from 'react'
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
import SliderComponent from '@/layout/User/pages/Home/HomeComponent/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const DoctorDetailRelated = (props) => {
  let { doctorList } = props;
  return (
    <div className={cx('doctor-related')} >
      <h3 className={cx('doctor-related-title', "title-section")} >
        Các Bác Sĩ Chung Khoa
      </h3>
      <div className={cx('wrapper')} ><SliderComponent type='doctor' numberShow={4} dot={false} listData={doctorList} /></div>

    </div>
  )
}

export default DoctorDetailRelated;