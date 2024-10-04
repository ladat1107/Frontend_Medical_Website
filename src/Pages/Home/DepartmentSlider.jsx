// DepartmentSlider.js
import React from "react";
import DepartmentInfo from "@/components/DepartmentInfo";
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/autoplay"; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay,} from 'swiper/modules'; 

const departments = [
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_033025_GMTupload_00001555.jpg/f2f096c7-609e-8282-d7cd-e66b71bd9a5d?t=1690317025389",
    title: "Khoa Nội tổng hợp",
    description: "Chuyên điều trị các bệnh lý nội khoa.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/304755/6_Aug_2023_023231_GMTupload_00008209.jpg/ec98f0e1-c624-db5a-fc04-1e055b51c854?t=1691263951642",
    title: "Khoa Nhi",
    description: "Chăm sóc và điều trị bệnh cho trẻ em.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/378268/29_Sep_2023_085349_GMTupload_01173426.jpg/2d06cf9a-2b7b-0288-bf4b-00b79da1ad37?t=1695952429234",
    title: "Khoa Phẫu thuật",
    description: "Thực hiện các ca phẫu thuật phức tạp.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
  {
    image:
      "https://bachmai.gov.vn/documents/37204/106726/26_Jul_2023_032022_GMTupload_00001506.jpg/c948a00a-7476-ac51-f090-0728a3c85f1e?t=1690316422288",
    title: "Khoa Sản",
    description: "Dịch vụ chăm sóc thai sản và sức khỏe phụ nữ.",
  },
];

const DepartmentSlider = () => {
  return (
    <section className="department" style={{ marginTop: "100px" }}>
      <div className="container-department">
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Các khoa của chúng tôi
        </h3>
        <div className="department-slider">
          <Swiper
           modules={[Autoplay]} // import modules here
            spaceBetween={5}
            slidesPerView={4}
            pagination={{ clickable: true }}
            
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000} // transition scroll (800ms)
            // navigation // using navigation
           
            style={{ padding: "20px 80px" }}
          >
            {departments.map((dept, index) => (
              <SwiperSlide key={index}>
                <DepartmentInfo dep={dept} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DepartmentSlider;
