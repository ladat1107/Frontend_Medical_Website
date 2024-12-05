import React from "react";
import classNames from "classnames/bind";
import styles from "./blogList.module.scss";
import SubBlog from "@/components/Sub-blog";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const HeadBlogList = () => {
  return (
    <div className={cx("head-blog-list")}>
      <ul className={cx("nav-cate")}>
        <li>TIN TỨC Y KHOA</li>
        <li>Tin dịch vụ</li>
        <li>Tin y tế</li>
        <li>Y học thường thức </li>
      </ul>

      <div className={cx("blog-list-body")}>
        <div className={cx("body-left")}>
          <div className={cx("blog-banner")}>
            <div className={cx("img")}>
              <img
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1733190956884_2269c9f458.png&w=1920&q=100"
                alt=""
              />
            </div>
            <h4 className={cx("blog-banner-title")}>
              Medpro đặt khám nhanh đã có trên zaloPay
            </h4>
            <p>
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
              sequi autem distinctio molestias temporibus? Asperiores ex fugiat
              consequuntur labore, inventore, nobis officiis nesciunt adipisci
              quaerat natus impedit, expedita provident repudiandae.{" "}
            </p>
            <span>
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path>
              </svg>{" "}
              11/2/2023, 10:33 - Thanh Ngân{" "}
            </span>

            <div className={cx("btn-next")}>Xem tiếp →</div>
          </div>

          <div className={cx("sub-blog")}>
            <div className={cx("sub-blog-item")}>
              <img
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
                alt=""
              />
              <div className={cx("content")}>
                <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
               
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cupiditate, illo. Officiis a iste rerum excepturi nesciunt
                 
                </p>
                <div className={cx("btn-next")}>Xem tiếp →</div>
              </div>
            </div>
            <div className={cx("sub-blog-item")}>
              <img
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732788380111_39096d0123.png&w=1920&q=75"
                alt=""
              />
              <div className={cx("content")}>
                <h4> Đặt lịch khám, đưa đón tiện lợi Medpro và Toàn Thắng </h4>
               
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cupiditate, illo. Officiis a iste rerum excepturi nesciunt
                  
                </p>
                <div className={cx("btn-next")}>Xem tiếp →</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("body-right")}>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
            <SubBlog/>
        </div>
      </div>
    </div>
  );
};

export default HeadBlogList;
