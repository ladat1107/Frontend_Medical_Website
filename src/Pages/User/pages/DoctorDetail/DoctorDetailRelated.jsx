

import React from 'react'
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
import useQuery from '@/hooks/useQuery';
import userService from '@/services/userService';
import SliderComponent from '@/Pages/Home/HomeComponent/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const DoctorDetailRelated = () => {

    const {
      data : doctorData,
      error : doctorError
    } = useQuery(() => userService.getDoctor())

      console.log('first', doctorData)
    const listDoctor = doctorData?.DT || [];


  return (
    <div className={cx('doctor-related')} >
        <h3 className={cx('doctor-related-title', "title-section")} >
            Các Bác Sĩ Chung Khoa
        </h3>
        <div className={cx('wrapper')} ><SliderComponent type='doctor' numberShow = {4} dot={false} listData={listDoctor} /></div>

    </div>
  )
}

export default DoctorDetailRelated;