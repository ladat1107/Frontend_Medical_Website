import { useLocation, useNavigate } from "react-router-dom";
import "./AppoimentList.scss";
import userService from "@/services/userService";
import { message } from "antd";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import useQuery from "@/hooks/useQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCalendarCheck, faCircleUser, faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "@/utils/formatDate";
import { faBriefcaseMedical, faLocationDot, faMapLocationDot, faMobileScreen, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { TIMESLOTS } from "@/constant/value";
import dayjs from "dayjs";
import { PATHS } from "@/constant/path";
import { useMutation } from "@/hooks/useMutation";
const AppointmentList = () => {
    const location = useLocation();
    let navigate = useNavigate();
    let [listAppoinment, setListAppoinment] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const {
        data: appoinmentData,
        execute: getAppoinment,
    } = useMutation(() => userService.getAppoinment({ status: 2 }));

    useEffect(() => {
        let confirmToken = queryParams.get('confirm');
        if (confirmToken !== null) {
            const fetchConfirmAsync = async () => {
                const response = await userService.confirmTokenBooking({ token: confirmToken });
                if (response?.data?.EC === 0 || response?.data?.EC === 1) {
                    message.success(response?.data?.EM);
                    navigate(PATHS.HOME.APPOINTMENT_LIST);
                } else {
                    message.error(response?.data?.EM);
                    navigate(PATHS.HOME.APPOINTMENT_LIST);
                }
            };
            fetchConfirmAsync();
        }
    }, []);
    useEffect(() => {
        getAppoinment();
    }, [location]);
    useEffect(() => {
        if (appoinmentData) {
            setListAppoinment(appoinmentData.DT);
        }
    }, [appoinmentData]);
    let handleCancel = async (profile) => {
        const response = await userService.cancelAppoinment(profile);
        if (response?.data?.EC === 0) {
            message.success(response?.data?.EM);
            setListAppoinment(listAppoinment.filter((item) => item.id !== profile.id));
        } else {
            message.error(response?.data?.EM);
        }
    }
    return (
        <div className="bg-white" >
            <Container>
                <div className="appoinment-list">
                    <div>
                        <div className="title">Danh sách lịch hẹn</div>
                    </div>
                    <div className="list-item-app">
                        {listAppoinment?.length > 0 && listAppoinment.map((profile, index) => (
                            <div className="patient-card" key={index}>
                                <div className="patient-info row">
                                    <div className="col-6">
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faCircleUser} /> <span className="b">Họ và tên:</span>
                                            </div>
                                            <span className="c col-8">{profile?.userExaminationData?.lastName + " " + profile?.userExaminationData?.firstName}</span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faAddressCard} />  <span className="b">CCCD:</span>
                                            </div>
                                            <span className="c col-8">{profile?.userExaminationData?.cid || "Chưa cập nhật"}</span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faEnvelope} />  <span className="b">Email:</span>
                                            </div>
                                            <span className="c col-8">{profile?.userExaminationData?.email || "Chưa cập nhật"}</span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faCalendarCheck} /><span className="b">Ngày sinh:</span>
                                            </div>
                                            <span className="c col-8">{profile?.userExaminationData?.dob ? formatDate(profile?.userExaminationData?.dob) : "Chưa cập nhật"}</span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3"> <FontAwesomeIcon icon={faMobileScreen} /> <span className="b">SĐT:</span></div>
                                            <span className="c col-8">{profile?.userExaminationData?.phoneNumber || "Chưa cập nhật"}</span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faVenusMars} />  <span className="b">Giới tính:</span>
                                            </div>
                                            <span className="c col-8">{profile?.userExaminationData?.gender === 0 ? "Nam" : "Nữ"}</span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faBriefcaseMedical} />  <span className="b">{profile?.examinationStaffData?.positon || "Bác sĩ"}:</span>
                                            </div>
                                            <span className="c col-8">
                                                {profile?.examinationStaffData?.staffUserData?.lastName + " " + profile?.examinationStaffData?.staffUserData?.firstName} ( Chuyên khoa: {profile?.examinationStaffData?.staffSpecialtyData?.name})
                                            </span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faClock} /> <span className="b">Thời gian:</span>
                                            </div>
                                            <span className="c col-8">{TIMESLOTS[profile?.time - 1].label} ngày {formatDate(profile?.admissionDate || new Date())}</span>
                                        </div>
                                        <div className="text-in row">
                                            <div className="col-3">
                                                <FontAwesomeIcon icon={faLocationDot} /> <span className="b">Phòng:</span>
                                            </div>
                                            <span className="c col-8">{profile?.roomName || "Chưa cập nhật"}</span>
                                        </div>
                                    </div>
                                    <div className="text-in-tc">
                                        <span>Triệu chứng: </span>
                                        <span className="c"> {profile?.symptom || "Chưa cập nhật"}</span>
                                    </div>
                                </div>
                                {dayjs(profile?.admissionDate).isSame(dayjs(), "day") ? <div></div> : <div className="patient-actions">
                                    <button className="btn delete" onClick={() => handleCancel(profile)}>Hủy lịch hẹn</button>
                                </div>}

                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default AppointmentList;