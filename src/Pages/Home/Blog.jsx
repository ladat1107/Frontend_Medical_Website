import BlogComp from "@/components/BlogComp";

import React from "react";

const Blog = () => {
  return (
    <section className="blog">
      <h3>Tin tức mới nhất</h3>
      <div className="container-blog">
        <div className="main-blog">
          <img
            src="https://bachmai.gov.vn/documents/37204/1494521/3_Oct_2024_022640_GMTz5891308787867_1f2b83723ec5a54d4d83abfe7e631276.jpg/8255f279-17f9-058d-93d0-4ea887db3515?t=1727922400488"
            alt=""
          />
          <div className="position-title" >Nghiên cứu của trung tâm đột quỵ, Bệnh viện bạch mai đạt giải đặc biệt tại Hội Nghị tại Châu Á thái bình dương 2023</div>
        </div>
        <div className="list-blog">
          <div className="blog-item">
            <div className="item-img">
              {" "}
              <img
                src="https://bachmai.gov.vn/documents/37204/1494484/3_Oct_2024_021714_GMTdd_voi_nB_UTP.jpg/b0c0217c-b0d9-5e9c-ffd3-8b8bdc6e0585?t=1727921834540"
                alt=""
              />
            </div>
            <div className="item-text">
              <p className="item-text-title">
                TẦM QUAN TRỌNG CỦA VIỆC SỬ DỤNG KHÁNG SINH TRONG ĐIỀU TRỊ
              </p>
              <span className="item-text-date">19/07/2003</span>
            </div>
          </div>
          <div className="blog-item">
            <div className="item-img">
              {" "}
              <img
                src="https://bachmai.gov.vn/documents/37204/1494551/3_Oct_2024_023827_GMTbs_D%C5%A9ng_nh%E1%BA%ADn_gi%E1%BA%A3i_c%E1%BB%A7a_APSO_2.jpg/3ae3cb8d-405c-039f-9c80-75cccbcbed1a?t=1727923107645"
                alt=""
              />
            </div>
            <div className="item-text">
              <p className="item-text-title">
                TẦM QUAN TRỌNG CỦA VIỆC SỬ DỤNG KHÁNG SINH TRONG ĐIỀU TRỊ
              </p>
              <span className="item-text-date">19/07/2003</span>
            </div>
          </div>
          <div className="blog-item">
            <div className="item-img">
              {" "}
              <img
                src="https://bachmai.gov.vn/documents/37204/1494521/3_Oct_2024_022640_GMTz5891308787867_1f2b83723ec5a54d4d83abfe7e631276.jpg/8255f279-17f9-058d-93d0-4ea887db3515?t=1727922400488"
                alt=""
              />
            </div>
            <div className="item-text">
              <p className="item-text-title">
                TẦM QUAN TRỌNG CỦA VIỆC SỬ DỤNG KHÁNG SINH TRONG ĐIỀU TRỊ
              </p>
              <span className="item-text-date">19/07/2003</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Blog;
