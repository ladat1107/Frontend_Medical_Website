import axios from "@/utils/axiosInstance";

const getAppointments = () => {
    return axios.get(`/api/getAllAppointments`)
}

const getUserByCid = (cid) => {
    return axios.get(`/api/getUserByCid?cid=${cid}`)
}

const getUserById = (id) => {
    return axios.get(`/api/getUserById?id=${id}`)
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

const searchAppointmentsWithStaffId = (page, limit, staffId, search, from, to) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("staffId", staffId);

    if (search) {
        params.append("search", search);
    }
    if (from) {
        params.append("from", from);
    }
    if (to) {
        params.append("to", to);
    }

    return axios.get(`/api/searchAppointmentWithStaffId?${params.toString()}`);
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

//Paraclinical
const createOrUpdateParaclinical = async (data) => {
    try {
        const response = await axios.post(`/api/createOrUpdateParaclinical`, data);
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating paraclinical:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
}

const deleteParaclinical = async (data) => {
    try {
        const response = await axios.delete(`/api/deleteParaclinical`, {
            params: {
                id: data.id,
                examinationId: data.examinationId
            }
        });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting paraclinical:", error.response?.data || error.message);
        throw error;
    }
}


//Prescription
const getPrescriptionByExaminationId = async (examinationId) => {
    return axios.get(`/api/getPrescriptionByExaminationId?examinationId=${examinationId}`)
}

const upsertPrescription = async (data) => {
    try {
        const response = await axios.post(`/api/upsertPrescription`, data);
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error upserting prescription:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
}

export {
    getUserByCid,
    getUserById,
    
    getAppointments,
    searchAppointments,
    searchAppointmentsWithStaffId,

    getExaminationById,
    createExamination,
    updateExamination,

    createOrUpdateParaclinical,
    deleteParaclinical,

    getDiseaseByName,
    getAllDisease,

    getPrescriptionByExaminationId,
    upsertPrescription,

    getAllRoomTypes,
    getAllMedicinesForExam,
    createOrUpdateVitalSign
}