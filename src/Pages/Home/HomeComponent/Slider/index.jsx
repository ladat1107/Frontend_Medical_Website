import React from "react";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import Slick Carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme CSS
import "./slider.scss";
import DoctorCard from "@/components/DoctorCard";
import DepartmentCard from "@/components/DepartmentCard";

const SliderComponent = ({ type = "service", numberShow = 6, autoplayProps, dot = true, listData} ) => {
  const listServices = [
    {
      title: "Khám Tại Cơ Sở",
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
    },
    {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
      {
        title: "Khám Tại Cơ Sở",
        img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      },
  ];
  const settings = {
    dots: dot, // Hiển thị phân trang
    // infinite: true, // Quay vòng slider
    speed: 800, // Tốc độ chuyển slide
    slidesToShow: numberShow, // Số lượng slide hiển thị cùng lúc
    slidesToScroll: 1, // Số slide chuyển mỗi lần
    autoplay: autoplayProps ? true : false, // Tự động chuyển slide
    autoplaySpeed: 3000, // Thời gian giữa các lần chuyển slide
    centerMode: false, // Nếu muốn các item ở giữa được căn giữa
    focusOnSelect: false, // Ngừng chuyển slide khi hover vào item
    draggable: false, // Ngừng kéo slider khi hover vào item
    swipe: false, // Ngừng khả năng vuốt
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {listServices.map((item, index) => {
          if (type === "service") {
            return (
              <div className="item-service">
                <img src={item.img} alt="" />
                <p className="main-text">{item.title}</p>
              </div>
            );
          }else if(type === 'doctor') {
                 return (
                    <DoctorCard/>
                 )
          }else if (type === 'colab'){
            return (
              <>
                <div className="item-colab" >  
                     <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75" alt="" />
                     <p className="main-text" >Bệnh viện chợ rẫy</p>
                </div>
              </>
            )
          }else if(type === 'advertisement'){
            return (
              <div className="item-advertisement" >
                  <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fce76da74-5584-451b-b417-c3b68ce49cfa-viettel_money_banner_fb_1180x310_copy2_copy.png&w=1200&q=100" alt="" />
                 
              </div>
            )
          }else if (type = 'department'){
            return (
              <>
              <DepartmentCard/>
              </>
            )
          }
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
