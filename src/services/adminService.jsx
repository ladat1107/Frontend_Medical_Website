import axios from "@/utils/axiosInstance";

const handleRegisterUser = (data) => {
    return axios.post(`/api/registerUser`, data)
}
const handleLogin = (data) => {
    return axios.post(`/api/handleLogin`, data)
}
const logoutUser = () => {
    return axios.post(`/api/handleLogout`)
}
// USER MANAGEMENT
const createUser = (data) => {
    return axios.post(`/api/admin/createUser`, data)
}
const getUser = (page, limit, search, position) => {
    return axios.get(`/api/admin/getAllUser?page=${+page}&limit=${+limit}&position=[${position}]&search=${search}`)
}
const getUserById = (id) => {
    return axios.get(`/api/getUserById?id=${id}`)
}
const deleteUser = (data) => {
    return axios.delete(`/api/admin/deleteUser`, { data: { id: data.id } })
}
const updateUser = (data) => {
    return axios.put(`/api/admin/updateUser`, data)
}
const blockUser = (data) => {
    return axios.put(`/api/admin/blockUser`, data)
}
const getStaffByRole = (role) => {
    return axios.get(`/api/getStaffByRole?roleId=${role}`)
}

// DEPARTMENT MANAGEMENT
const createDepartment = (data) => {
    return axios.post(`/api/admin/createDepartment`, data)
}
const getNameDepartment = () => {
    return axios.get(`/api/getAllNameDepartment`)
}
const getDepartment = (page, limit, search) => {
    return axios.get(`/api/getAllDepartment?page=${+page}&limit=${+limit}&search=${search}`)
}
const getDepartmentById = (id) => {
    return axios.get(`/api/getDepartmentById?id=${id}`)
}
const deleteDepartment = (data) => {
    return axios.delete(`/api/admin/deleteDepartment `, { data: { id: data.id } })
}
const updateDepartment = (data) => {
    return axios.put(`/api/admin/updateDepartment`, data)
}
const blockDepartment = (data) => {
    return axios.put(`/api/admin/blockDepartment`, data)
}

// SERVICE OF ROOM MANAGEMENT
const getServiceOfRoom = (page, limit, search) => {
    return axios.get(`/api/admin/getAllServiceTypes?page=${+page}&limit=${+limit}&search=${search}`)
}
const getServiceSearch = () => {
    return axios.get(`/api/admin/getServiceSearch`)
}
const getServiceById = (id) => {
    return axios.get(`/api/getServiceTypeById?id=${id}`)
}
const deleteServiceOfRoom = (data) => {
    return axios.delete(`/api/admin/deleteServiceType`, { data: { id: data.id } })
}
const updateServiceOfRoom = (data) => {
    return axios.put(`/api/admin/updateServiceType`, data)
}
const blockServiceOfRoom = (data) => {
    return axios.put(`/api/admin/blockServiceType`, data)
}
const createServiceOfRoom = (data) => {
    return axios.post(`/api/admin/createServiceType`, data)
}

// ROOM MANAGEMENT
const createRoom = (data) => {
    return axios.post(`/api/admin/createRoom`, data)
}
const getAllRoom = (page, limit, search, searchDepartment) => {
    return axios.get(`/api/admin/getAllRoomAdmin?page=${+page}&limit=${+limit}&search=${search}&searchDepartment=${searchDepartment}`)
}
const getRoomById = (id) => {
    return axios.get(`/api/getRoomById?id=${id}`)
}
const updateRoom = (data) => {
    return axios.put(`/api/admin/updateRoom`, data)
}
const deleteRoom = (data) => {
    return axios.delete(`/api/admin/deleteRoom`, { data: { id: data.id } })
}
const blockRoom = (data) => {
    return axios.put(`/api/admin/blockRoom`, data)
}

// SPECIALTY MANAGEMENT
const getSpecialtySelect = () => {
    return axios.get(`/api/admin/getSpecialtySelect`)
}
export {
    handleRegisterUser,
    handleLogin,
    logoutUser,
    getUser,
    getUserById,
    deleteUser,
    updateUser,
    blockUser,
    getNameDepartment,
    getDepartment,
    getDepartmentById,
    deleteDepartment,
    updateDepartment,
    blockDepartment,
    createUser,
    getStaffByRole,
    createDepartment,
    getServiceOfRoom,
    deleteServiceOfRoom,
    updateServiceOfRoom,
    blockServiceOfRoom,
    getServiceById,
    createServiceOfRoom,
    getServiceSearch,
    createRoom,
    getAllRoom,
    getRoomById,
    updateRoom,
    deleteRoom,
    blockRoom,
    getSpecialtySelect,
}