


import React from 'react'
import classNames from "classnames/bind";
import styles from "./doctorDetail.module.scss";
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
                     <div className={cx('blog-item')} >
                        <div className={cx('blog-item-img')} >
                            <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75" alt="" />
                        </div>
                        <div className={cx('blog-item-content')} >
                            <div className={cx('content-title')} >
                                <span></span>
                                <p>Tin Y tế</p>
                            </div>
                            <p className={cx('body-content')} >Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM</p>
                            <div className={cx('date')} >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                             <span>14/1/2024</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('blog-item')} >
                        <div className={cx('blog-item-img')} >
                            <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75" alt="" />
                        </div>
                        <div className={cx('blog-item-content')} >
                            <div className={cx('content-title')} >
                                <span></span>
                                <p>Tin Y tế</p>
                            </div>
                            <p className={cx('body-content')} >Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM</p>
                            <div className={cx('date')} >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                             <span>14/1/2024</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('blog-item')} >
                        <div className={cx('blog-item-img')} >
                            <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75" alt="" />
                        </div>
                        <div className={cx('blog-item-content')} >
                            <div className={cx('content-title')} >
                                <span></span>
                                <p>Tin Y tế</p>
                            </div>
                            <p className={cx('body-content')} >Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM</p>
                            <div className={cx('date')} >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                             <span>14/1/2024</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('blog-item')} >
                        <div className={cx('blog-item-img')} >
                            <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75" alt="" />
                        </div>
                        <div className={cx('blog-item-content')} >
                            <div className={cx('content-title')} >
                                <span></span>
                                <p>Tin Y tế</p>
                            </div>
                            <p className={cx('body-content')} >Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM</p>
                            <div className={cx('date')} >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                             <span>14/1/2024</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('blog-item')} >
                        <div className={cx('blog-item-img')} >
                            <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75" alt="" />
                        </div>
                        <div className={cx('blog-item-content')} >
                            <div className={cx('content-title')} >
                                <span></span>
                                <p>Tin Y tế</p>
                            </div>
                            <p className={cx('body-content')} >Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM</p>
                            <div className={cx('date')} >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                             <span>14/1/2024</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('blog-item')} >
                        <div className={cx('blog-item-img')} >
                            <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcms.medpro.com.vn%2Fuploads%2F1732334644872_df53184776.png&w=1920&q=75" alt="" />
                        </div>
                        <div className={cx('blog-item-content')} >
                            <div className={cx('content-title')} >
                                <span></span>
                                <p>Tin Y tế</p>
                            </div>
                            <p className={cx('body-content')} >Chi phí Căng da bao nhiêu ? Những nơi uy tín tại HCM</p>
                            <div className={cx('date')} >
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="13" width="13" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 01-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"></path></svg>
                             <span>14/1/2024</span>
                            </div>
                        </div>
                    </div>
                    
                     </div>
                 </div>
        </div>

    </div>
  )
}

export default DoctorDetailBody