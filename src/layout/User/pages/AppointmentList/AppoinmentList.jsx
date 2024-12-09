import { useLocation } from "react-router-dom";
import "./AppoimentList.scss";
import userService from "@/services/userService";
import { message } from "antd";
import { useEffect } from "react";
import Container from "@/components/Container";
const AppointmentList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        let confirmToken = queryParams.get('confirm');
        if (confirmToken !== null) {
            const fetchConfirmAsync = async () => {
                const response = await userService.confirmTokenBooking({ token: confirmToken });
                if (response?.data?.EC === 0 || response?.data?.EC === 1) {
                    message.success(response?.data?.EM);
                } else {
                    message.error(response?.data?.EM);
                }
            };
            fetchConfirmAsync();
        }
    }, []);
    const fakePatientData = [
        {
            id: 1,
            name: "LA VĂN GIÀU",
            dob: "11/07/2003",
            phone: "032****761",
            gender: "Nam",
            address: "Ho Chi Minh, Xã Hiệp Phước, Huyện Nhà Bè, Thành phố Hồ Chí Minh",
            ethnicity: "Kinh",
        },
        {
            id: 2,
            name: "LA TIẾN ĐẠT",
            dob: "11/07/2003",
            phone: "036****761",
            gender: "Nam",
            address: "Ho Chi Minh, Phường Linh Tây, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            ethnicity: "Kinh",
        },
        {
            id: 3,
            name: "NGUYỄN THỊ HOA",
            dob: "15/05/1995",
            phone: "090****123",
            gender: "Nữ",
            address: "Hà Nội, Phường Láng Hạ, Quận Đống Đa, Thành phố Hà Nội",
            ethnicity: "Tày",
        },
        {
            id: 4,
            name: "PHẠM QUANG HUY",
            dob: "22/10/1980",
            phone: "098****456",
            gender: "Nam",
            address: "Đà Nẵng, Quận Hải Châu, Thành phố Đà Nẵng",
            ethnicity: "Kinh",
        },
    ];

    return (
        <div className="bg-white" >
            <Container>
                <div className="appoinment-list">
                    <div>
                        <div className="title">Danh sách lịch hẹn</div>
                    </div>
                    <div className="list-item-app">
                        {fakePatientData.map((profile, index) => (
                            <div className="patient-card" key={index}>
                                <div className="patient-info">
                                    <p>
                                        <i className="icon-user"></i> <b>Họ và tên:</b> <span>{profile.name}</span>
                                    </p>
                                    <p>
                                        <i className="icon-calendar"></i> <b>Ngày sinh:</b> <span>{profile.dob}</span>
                                    </p>
                                    <p>
                                        <i className="icon-phone"></i> <b>Số điện thoại:</b> <span>{profile.phone}</span>
                                    </p>
                                    <p>
                                        <i className="icon-gender"></i> <b>Giới tính:</b> <span>{profile.gender}</span>
                                    </p>
                                    <p>
                                        <i className="icon-location"></i> <b>Địa chỉ:</b> <span>{profile.address}</span>
                                    </p>
                                    <p>
                                        <i className="icon-people"></i> <b>Dân tộc:</b> <span>{profile.ethnicity}</span>
                                    </p>
                                </div>
                                <div className="patient-actions">
                                    <button className="btn delete">Xóa hồ sơ</button>
                                    <button className="btn edit">Sửa hồ sơ</button>
                                    <button className="btn details">Chi tiết</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default AppointmentList;