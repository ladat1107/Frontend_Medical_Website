


import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import SliderComponent from "./HomeComponent/Slider";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Collaboration = () => {
  return (
    <div className={cx('colab')} >
        <h3 className={cx("colab-title", "title-section")} >
        Được tin tưởng hợp tác và đồng hành
        </h3>
        <SliderComponent  type="colab" dot={false} />
       
    </div>
  )
}

export default Collaboration