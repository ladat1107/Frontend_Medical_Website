

import React from 'react'
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import SliderComponent from './HomeComponent/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const OurTeam = () => {
  return (
    <div className={cx('ourTeam')} >
        <h3 className={cx('ourTeam-title', "title-section")} >
            ĐỘI NGŨ BÁC SĨ
        </h3>
        <div className={cx('wrapper')} ><SliderComponent type='doctor' numberShow = {4} dot={false} /></div>

    </div>
  )
}

export default OurTeam