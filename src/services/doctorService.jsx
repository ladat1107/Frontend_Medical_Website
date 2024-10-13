import axios from "@/utils/axiosInstance";

const getAppointments = () => {
    return axios.get(`/api/getAllAppointments`)
}

const getUserByCid = (cid) => {
    return axios.get(`/api/getUserByCid?cid=${cid}`)
}

const searchAppointments = (page, limit, search, from, to) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    if (search) {
        params.append("search", search);
    }
    if (from) {
        params.append("from", from);
    }
    if (to) {
        params.append("to", to);
    }

    return axios.get(`/api/searchAppointment?${params.toString()}`);
};

// Examination
const getExaminationById = (id) => {
    try{
        return axios.get(`/api/getExaminationById?id=${id}`)
    } catch (error) {
        console.error("Error getting examination by id:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
}

const createExamination = async (data) => {
    try {
        const response = await axios.post(`/api/createExamination`, data);
        console.log("Response:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error creating examination:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

const updateExamination = async (data) => {
    try {
        const response = await axios.put(`/api/updateExamination`, data);
        console.log("Response:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error updating examination:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};


const getDiseaseByName = (name) => {
    return axios.get(`/api/getDiseaseByName?name=${name}`)
}

const getAllDisease = () => {
    return axios.get(`/api/getAllDisease`)
}

const getAllRoomTypes = () => {
    return axios.get(`/api/getAllRoomTypes`)
}

const getAllMedicinesForExam = () => {
    return axios.get(`/api/getAllMedicinesForExam`)
}

//vital sign
const createOrUpdateVitalSign = async (data) => {
    try {
        const response = await axios.post(`/api/createOrUpdateVitalSign`, data);
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating vital sign:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
}

export {
    getUserByCid,

    getAppointments,
    searchAppointments,

    getExaminationById,
    createExamination,
    updateExamination,

    getDiseaseByName,
    getAllDisease,

    getAllRoomTypes,
    getAllMedicinesForExam,
    createOrUpdateVitalSign
}