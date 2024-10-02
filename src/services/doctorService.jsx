import axios from "@/utils/axiosInstance";

const getAppointments = () => {
    return axios.get(`/api/getAllAppointments`)
}

export {
    getAppointments,
}