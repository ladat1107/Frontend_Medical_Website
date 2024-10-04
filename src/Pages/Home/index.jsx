import React from "react";

import Marquee from "@/components/Marquee";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Container from "@/components/Container";
import Banner from "./Banner";
import Specialty from "./Specialty";
import OurTeam from "./OurTeam";
import Collaboration from "./Collaboration";
import SliderComponent from "./HomeComponent/Slider";
import Department from "./Department";
import Statistical from "./Statistical";
import Dowload from "./Dowload";
import Media from "./Media";
import VideoComponent from "@/components/Video";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const HomePage = () => {
  const a = [
    "http://benhvienkhuvucthuduc.vn/content/uploads/Banner/c954630d-00be-4760-89cb-6088dd1361a5/b78f4cd4-d939-4479-b4d8-b1e100e51f35_tieusoihuyet-noitk-goicapcuu123.jpg",
    "http://benhvienkhuvucthuduc.vn/content/uploads/Banner/fc6e0240-20e3-4a28-a43d-b75ff511a016/16423e45-045c-41f8-b729-b1e100e5a753_banner-dangkykhamquaweb-web-update1900066883-02112023.jpg",
    "http://benhvienkhuvucthuduc.vn/content/uploads/Banner/c954630d-00be-4760-89cb-6088dd1361a5/b78f4cd4-d939-4479-b4d8-b1e100e51f35_tieusoihuyet-noitk-goicapcuu123.jpg",
  ];
  return (
    <>
      <Marquee />
      <div className={cx("bg-banner")}>
        <Container>
          <Banner />
        </Container>
      </div>

      <Container>
        <Collaboration />
        <SliderComponent
          type="advertisement"
          numberShow={1}
          autoplayProps={true}
          dot={false}
        />
      </Container>

      <div className={cx("bg-ourTeam")}>
        <Container>
          <Department />
          <OurTeam />
        </Container>
      </div>
      <Container>
        <Specialty />

        <Dowload />
        <Media />
        <VideoComponent />
      </Container>
      <div className={cx("bg-statistical")}>
        <Container>
          <Statistical />
        </Container>
      </div>
    </>
  );
};

export default HomePage;
