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
