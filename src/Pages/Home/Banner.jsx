import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Search from "./HomeComponent/Search";
import SliderComponent from "./HomeComponent/Slider";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
const Banner = () => {

 
  return (
    <div className={cx("banner")}>
      <div className={cx("top-search")}>
        <h2 className={cx("title-search")}>
          Kết Nối Người Dân Với Cơ Sở Y Tế - Dịch Vụ Y Tế
        </h2>

        <Search />
        <h4 className={cx("sub-title","subtitle-section")}>
          Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
        </h4>
      </div>
      <SliderComponent dot={false} />
    </div>
  );
};

export default Banner;
