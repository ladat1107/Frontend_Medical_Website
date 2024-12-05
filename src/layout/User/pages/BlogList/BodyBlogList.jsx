

import React from 'react'
import classNames from "classnames/bind";
import styles from "./blogList.module.scss";
import SliderComponent from './Components/Slider';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const BodyBlogList = () => {

    const a = [1,2,3,4,5,6,7,,8,0]
  return (
    <div className={cx('body-list-blog')}  >
       
       <div className={cx('slider-section')} >
          <div className={cx('title-top')} >
            <h3>TIN Y TẾ</h3>
            <span className={cx('line')} ></span>
          </div>

          <SliderComponent listData={a} numberShow={4} dot={false} />
       </div>
       <div className={cx('slider-section')} >
          <div className={cx('title-top')} >
            <h3>TIN DỊCH VỤ</h3>
            <span className={cx('line')} ></span>
          </div>

          <SliderComponent listData={a} numberShow={4} dot={false}/>
       </div>
       <div className={cx('slider-section')} >
          <div className={cx('title-top')} >
            <h3>Y TẾ THƯỜNG THỨC</h3>
            <span className={cx('line')} ></span>
          </div>

          <SliderComponent listData={a} numberShow={4}dot={false} />
       </div>
        
    </div>
  )
}

export default BodyBlogList