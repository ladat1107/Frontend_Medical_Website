import React from 'react';
import './footer.scss'; // Đảm bảo bạn đã import file CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Thông tin liên hệ</h3>
          <p><strong>Địa chỉ:</strong> 123 Đường Y tế, Quận 1, Thành phố Hồ Chí Minh</p>
          <p><strong>Điện thoại:</strong> (028) 1234 5678</p>
          <p><strong>Email:</strong> contact@hospital.com</p>
        </div>
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#services">Dịch vụ</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Giờ làm việc</h3>
          <p>Thứ 2 - Thứ 6: 8:00 AM - 5:00 PM</p>
          <p>Thứ 7: 8:00 AM - 12:00 PM</p>
          <p>Chủ nhật: Nghỉ</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bệnh viện ABC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
