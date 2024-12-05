


import React from 'react'
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
import SubBlog from '@/components/Sub-blog';
// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const DoctorDetailBody = () => {
    
  return (
    <div className={cx('doctor-body')} >

        <div className={cx('wrapper')} >
                 <div className={cx('introduce')} >
                    <div className={cx('introduce-top')} >
                        <h3 className={cx('title')} >Gioi thiệu</h3>
                        <ul>
                            <li >
                                
                            Bác sĩ Phan Bá Hà với kinh nghiệm thực tế thăm khám bệnh tại bệnh viện và hợp tác lâu dài với các phòng khám, đã tạo dựng được niềm tin và sự tín nhiệm với nhiều bệnh nhân.
                            </li>
                            <li>
                            Bác sĩ Hà chuyên khám - tư vấn - thực hiện các cận lâm sàng -chuyên môn điều trị bệnh nội khoa - tiêu hóa thực hiện trực tiếp siêu âm, nội soi tiêu hóa ( dạ dày - đại tràng ). Đồng thời, bác còn đồng hành thăm khám tư vấn qua online với tinh thần tỉ mỉ, quan tâm lắng nghe và thăm hỏi bệnh sử kĩ lưỡng qua đó điều trị và hỗ trợ bệnh hiệu quả.
                            </li>
                        </ul>
                    </div>
                    <div className={cx('introduce-bottom')} >
                    <h3 className={cx('title')} >Gioi thiệu</h3>
                        <ul>
                            <li>
                             khám bệnh đã tạo dựng được niềm tin và sự tín nhiệm với nhiều bệnh nhân Đồng thời, bác còn đồng hành thăm khám tư .
                            </li>
                            <li>
                             ( dạ dày - đại tràng ). Đồng thời, bác còn đồng hành thăm khám tư vấn qua online với tinh thần tỉ mỉ, quan tâm lắng nghe và thăm hỏi bệnh sử kĩ lưỡng qua đó điều trị và hỗ trợ bệnh hiệu quả.
                            </li>
                        </ul>
                    </div>

                 </div>

                 <div className={cx('related-blog')} >
                    <div className={cx('blog-title')} >Bài viết Liên quan</div>
                     <div className={cx('blog-item-list')} >
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                     <SubBlog/>
                    
                     </div>
                 </div>
        </div>


    </div>
  )
}

export default DoctorDetailBody