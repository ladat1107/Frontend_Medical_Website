import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="full-screen-slider">
      <Slider {...settings}>
        <div>
          <img src="http://benhvienkhuvucthuduc.vn/content/uploads/Banner/c954630d-00be-4760-89cb-6088dd1361a5/b78f4cd4-d939-4479-b4d8-b1e100e51f35_tieusoihuyet-noitk-goicapcuu123.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="http://benhvienkhuvucthuduc.vn/content/uploads/Banner/fc6e0240-20e3-4a28-a43d-b75ff511a016/16423e45-045c-41f8-b729-b1e100e5a753_banner-dangkykhamquaweb-web-update1900066883-02112023.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="http://benhvienkhuvucthuduc.vn/content/uploads/Banner/c954630d-00be-4760-89cb-6088dd1361a5/b78f4cd4-d939-4479-b4d8-b1e100e51f35_tieusoihuyet-noitk-goicapcuu123.jpg" alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
