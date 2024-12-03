import axios from "@/utils/axiosInstance";

const getAppointments = () => {
    return axios.get(`/api/getAllAppointments`)
}

const getUserByCid = (cid) => {
    try{
        return axios.get(`/api/getUserByCid?cid=${cid}`)
    } catch (error) {
        console.error("Error getting user by cid:", error.response?.data || error.message);
        throw error; 
    }
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
export const getExaminations = async (date, status, is_appointment, page, limit, search, time) => {
    try {
        if(!time) time = '';
        
        const response = await axios.get(`/api/getExaminations?date=${date}&status=${status}&is_appointment=${is_appointment}&page=${+page}&limit=${+limit}&search=${search}&time=${time}`);
        //console.log("Response:", response.data); 
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const getExaminationById = (id) => {
    try{
        return axios.get(`/api/getExaminationById?id=${id}`)
    } catch (error) {
        console.error("Error getting examination by id:", error.response?.data || error.message);
        throw error; 
    }
}

const createExamination = async (data) => {
    try {
        const response = await axios.post(`/api/createExamination`, data);
        //console.log("Response:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error creating examination:", error.response?.data || error.message);
        throw error; 
    }
};

const updateExamination = async (data) => {
    try {
        const response = await axios.put(`/api/updateExamination`, data);
        //console.log("Response:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error updating examination:", error.response?.data || error.message);
        throw error; 
    }
};


const getDiseaseByName = (name) => {
    return axios.get(`/api/getDiseaseByName?name=${name}`)
}

const getAllDisease = () => {
    return axios.get(`/api/getAllDisease`)
}

const getAllRoomTypes = () => {
    return axios.get(`/api/getAllServiceTypes`)
}

const getAllMedicinesForExam = () => {
    return axios.get(`/api/getAllMedicinesForExam`)
}

const getStaffNameById = (doctorId) => {
    return axios.get(`/api/getStaffNameById?staffId=${doctorId}`);
}

//vital sign
const createOrUpdateVitalSign = async (data) => {
    try {
        const response = await axios.post(`/api/createOrUpdateVitalSign`, data);
        //console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating vital sign:", error.response?.data || error.message);
        throw error; 
    }
}

//Paraclinical
const createOrUpdateParaclinical = async (data) => {
    try {
        const response = await axios.post(`/api/createOrUpdateParaclinical`, data);
        //console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating paraclinical:", error.response?.data || error.message);
        throw error; 
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
        //console.log("Response:", response.data);
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
        //console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error upserting prescription:", error.response?.data || error.message);
        throw error; 
    }
}

//Hand book
const getAllHandbooks = async (page, limit, search, staffId, filter, status) => {
    try {
        const response = await axios.get(`/api/getAllHandBooks?page=${page}&limit=${limit}&search=${search}&filter=${filter}&staffId=${staffId}&status=${status}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const getHandbookById = async (id) => {
    try {
        const response = await axios.get(`/api/getHandBookById?id=${id}`);
        //console.log("Response:", response.data); 
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const createHandbook = async (data) => {
    try {
        const response = await axios.post(`/api/createHandBook`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating handbook:", error.response?.data || error.message);
        throw error; 
    }
}

const updateHandbook = async (data) => {
    try {
        const response = await axios.put(`/api/updateHandBook`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating handbook:", error.response?.data || error.message);
        throw error; 
    }
}

const getAllTags = async () => {
    try {
        const response = await axios.get(`/api/getAllTags`);
        // console.log('Data tags received:', response);
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const getScheduleByStaffId = async (staffId) => {
    try {
        const response = await axios.get(`/api/getScheduleByStaffId?staffId=${staffId}`);
        //console.log("Response:", response.data); 
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

//specialty
export const getSpecialties = async () => {
    try {
        const response = await axios.get(`/api/getSpecialtiesByDepartment`);
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

//insuarance
export const getUserInsuarance = async (userId) => {
    try{
        const response = await axios.get(`/api/getUserInsuarance?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
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
    createOrUpdateVitalSign,

    getAllHandbooks,
    createHandbook,
    getHandbookById,
    updateHandbook,
    getAllTags,

    getScheduleByStaffId,
    getStaffNameById
}