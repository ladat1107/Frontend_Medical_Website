
import SvgIcon from "../SvgIcon";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import Dropdown from "../Dropdown";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

function Header() {
  // language
  const items = [
    { title: "Home", icon: <SvgIcon name="tiktok" /> },
    { title: "About", icon: <SvgIcon name="tiktok" /> },
    { title: "Services", icon: <SvgIcon name="tiktok" /> },
    { title: "Contact", icon: <SvgIcon name="tiktok" /> },
  ];
  // nav

  const navMenu = [
    {
      title: "Cơ sở",
      inner: [
        { title: "medical", icon: null },
        { title: "medical", icon: null },
        { title: "medical", icon: null },
      ],
    },
    {
      title: "y tế",
      inner: [
        { title: "medical", icon: null },
        { title: "medical", icon: null },
        { title: "medical", icon: null },
      ],
    },
    {
      title: "Khám sức",
      inner: [
        { title: "medical", icon: null },
        { title: "medical", icon: null },
        { title: "medical", icon: null },
      ],
    },
    {
      title: "Tin tức",
      inner: [
        { title: "medical", icon: null },
        { title: "medical", icon: null },
        { title: "medical", icon: null },
      ],
    },
    {
      title: "Hướng dẫn",
      inner: [
        { title: "medical", icon: null },
        { title: "medical", icon: null },
        { title: "medical", icon: null },
      ],
    },
    {
      title: "Liên hệ ",
      inner: [
        { title: "medical", icon: null },
        { title: "medical", icon: null },
        { title: "medical", icon: null },
      ],
    },
  ];

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("header-img")}>
          <img
            src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fheader_logo.svg&w=1920&q=75"
            alt=""
          />
        </div>

        <div className={cx("header-content")}>
          <div className={cx("top-content")}>
            <div className={cx("app-logo")}>
              <div className={cx("item")}>
                <SvgIcon name="tiktok" width={32} height={32} fill="#000" />
                <span className="header-text" >Tiktok</span>
              </div>
              <div className={cx("item")}>
                <SvgIcon name="facebook" width={32} height={32} fill="#000" />
                <span className="header-text" >Facebook</span>
              </div>
              <div className={cx("item")}>
                <SvgIcon name="youtube" width={32} height={32} fill="#000" />
                <span className="header-text" >youtube</span>
              </div>
              <div className={cx("item")}>
                <SvgIcon name="instagram" width={32} height={32} fill="#000" />
                <span className="header-text" >instagram</span>
              </div>
            </div>

            <div className={cx("auth")}>
              <div className={cx("account-btn", "header-text")}>Đăng nhập</div>
              <div className={cx("account-btn", "header-text")}>Đăng ký</div>

              <div className={cx("language")}>
                <Dropdown title="Language" items={items} />
              </div>
            </div>
          </div>

          <div className={cx("bottom-content")}>
            <div className={cx("hotline")}>
              <img
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhp.a16c51cc.svg&w=1920&q=75"
                alt=""
              />
              <div className={cx("hotline-text")}>
                <p className="header-text" > Ho Tro Dat Kham</p>
                <p style={{ fontSize: "24px", color: "#ffb54a" }} >0353366459</p>
              </div>
            </div>
            <div className={cx("nav")}>
              {navMenu.map((item, index) => {
                return <Dropdown title={item.title} items={item.inner} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
