import axios from "@/utils/axiosInstance";

const getAppointments = () => {
    return axios.get(`/api/getAllAppointments`)
}

const getUserByCid = (cid) => {
    return axios.get(`/api/getUserByCid?cid=${cid}`)
}

const searchAppointments = (page, limit, search, from, to) => {
    return axios.get(`/api/searchAppointment?page=${+page}&limit=${+limit}&search=${search}&from=${from}&to=${to}`)
}

const createExamination = (data) => {
    return axios.post(`/api/createExamination`, data)
}

const getDiseaseByName = (name) => {
    return axios.get(`/api/getDiseaseByName?name=${name}`)
}

export {
    getAppointments,
    getUserByCid,
    searchAppointments,
    createExamination,
    getDiseaseByName
}