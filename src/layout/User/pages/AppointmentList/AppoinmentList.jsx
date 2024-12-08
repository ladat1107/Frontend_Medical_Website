import { useLocation } from "react-router-dom";
import "./AppoimentList.scss";
import userService from "@/services/userService";
import { message } from "antd";
import { useEffect } from "react";
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
    return (
        <div className="appoinment-list">
            <h1>appointmentList</h1>
        </div>
    );
}

export default AppointmentList;