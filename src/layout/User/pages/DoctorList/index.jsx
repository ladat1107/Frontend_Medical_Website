import React from "react";
import classNames from "classnames/bind";
import styles from "./doctorList.module.scss";
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);
import Container from "@/components/Container";
import Banner from "./Banner";
import DoctorInfo from "./DoctorInfo";
import userService from "@/services/userService";
import useQuery from "@/hooks/useQuery";

const DoctorList = () => {
  const {
    data: doctorData,
  } = useQuery(() => userService.getDoctor());
  const doctorList = doctorData?.DT || [];
  return (
    <div>
      <Banner />
      <div className={cx('bg')} >
        <Container>
          {doctorList?.length > 0 && <DoctorInfo doctorList={doctorList} />}
        </Container>
      </div>
    </div>
  );
};

export default DoctorList;
