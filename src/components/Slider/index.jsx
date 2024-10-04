import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";

const ImageSlider = ({ images }) => {
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
        {images?.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} alt={`Slide ${index + 1}`} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
