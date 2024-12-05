import React from "react";
import classNames from "classnames/bind";
import styles from "./subBlog.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const SubBlog = () => {
  return (
    <div>
      <div className={cx("blog-item")}>
        <div className={cx("blog-item-img")}>
          <img
            src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75"
            alt=""
          />
        </div>
        <div className={cx("blog-item-content")}>
          <div className={cx("content-title")}>
            <span></span>
            <p>Tin Y tế</p>
          </div>
          <p className={cx("body-content")}>
            Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM
          </p>
          <div className={cx("date")} style={{alignItems:"center"}} >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="13"
              width="13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path>
            </svg>
            <span> 14/1/2024, 10:33 - Thanh Ngân</span>
           
          </div>
          <div className={cx('btn-next')} >Xem tiếp → </div>
        </div>
      </div>
    </div>
  );
};

export default SubBlog;
