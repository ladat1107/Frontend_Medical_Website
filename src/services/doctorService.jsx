import axios from "@/utils/axiosInstance";

const getAppointments = () => {
    return axios.get(`/api/getAllAppointments`)
}

const searchAppointments = (page, limit, search, from, to) => {
    return axios.get(`/api/searchAppointment?page=${+page}&limit=${+limit}&search=${search}&from=${from}&to=${to}`)
}

export {
    getAppointments,
    searchAppointments,
}