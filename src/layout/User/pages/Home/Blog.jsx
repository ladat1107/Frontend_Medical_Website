import React from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";

// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Blog = () => {
  return (
    <div className={cx("blog")}>
      <h3 className={cx("blog-title", "title-section")}>Tin tức y tế</h3>
      <div className={cx("blog-item-wrapper")}>
        <div className={cx("blog-item-left")}>
          <img
            src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
            alt=""
          />
          <div className={cx("content")}>
            <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
            <span> 28/12/2023, 05:21 - Tú Nguyễn </span>
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Cupiditate, illo. Officiis a iste rerum excepturi nesciunt
              deserunt dicta reprehenderit iure, quam consectetur incidunt
              aliquam nostrum, quaerat aliquid ea at cupiditate.{" "}
            </p>
          </div>
        </div>
        <div className={cx("blog-item-right")}>
          <div className={cx("blog-inner-item")}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
              alt=""
            />
            <div className={cx("content")}>
              <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
              <span> 28/12/2023, 05:21 - Tú Nguyễn </span>
            </div>
          </div>
          <div className={cx("blog-inner-item")}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
              alt=""
            />

            <div className={cx("content")}>
              <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
              <span> 28/12/2023, 05:21 - Tú Nguyễn </span>
            </div>
          </div>
          <div className={cx("blog-inner-item")}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
              alt=""
            />

            <div className={cx("content")}>
              <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
              <span> 28/12/2023, 05:21 - Tú Nguyễn </span>
            </div>
          </div>
          <div className={cx("blog-inner-item")}>
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
              alt=""
            />

            <div className={cx("content")}>
              <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
              <span> 28/12/2023, 05:21 - Tú Nguyễn </span>
            </div>
          </div>
        </div>
       
      </div>
      <div className={cx('btn-show-more')} >Xem tất cả</div>
    </div>
  );
};

export default Blog;
