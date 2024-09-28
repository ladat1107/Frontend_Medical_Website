import ImageSlider from "@/components/Slider";
import DoctorSearch from "./DoctorSearch";
import CustomService from "./CustomService";

import './homePage.scss'; // Đảm bảo bạn đã import file CSS


import React from "react";

const HomePage = () => {
  return (
    <>
      <ImageSlider />
      <DoctorSearch/>
      <CustomService/>
    </>
  );
};

export default HomePage;
