import ImageSlider from "@/components/Slider";
import OurServices from "./OurServices";
import Introduce from "./Introduce";
import Blog from "./Blog";
import DepartmentSlider from "./DepartmentSlider";
import './homePage.scss'; // Đảm bảo bạn đã import file CSS


import React from "react";

const HomePage = () => {
  const a = [
    "http://benhvienkhuvucthuduc.vn/content/uploads/Banner/c954630d-00be-4760-89cb-6088dd1361a5/b78f4cd4-d939-4479-b4d8-b1e100e51f35_tieusoihuyet-noitk-goicapcuu123.jpg",
    "http://benhvienkhuvucthuduc.vn/content/uploads/Banner/fc6e0240-20e3-4a28-a43d-b75ff511a016/16423e45-045c-41f8-b729-b1e100e5a753_banner-dangkykhamquaweb-web-update1900066883-02112023.jpg",
    "http://benhvienkhuvucthuduc.vn/content/uploads/Banner/c954630d-00be-4760-89cb-6088dd1361a5/b78f4cd4-d939-4479-b4d8-b1e100e51f35_tieusoihuyet-noitk-goicapcuu123.jpg",
  ];
  return (
    <>
      <ImageSlider images = {a} />
      <OurServices/>
      <Introduce/>
      <Blog/>
      <DepartmentSlider/>
      
    </>
  );
};

export default HomePage;
