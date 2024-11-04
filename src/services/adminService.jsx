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
const deleteUser = (data) => {
    return axios.delete(`/api/admin/deleteUser`, { data: { id: data.id } })
}
const updateUser = (data) => {
    return axios.put(`/api/user/update`, data)
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

// 
export {
    handleRegisterUser,
    handleLogin,
    logoutUser,
    getUser,
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
    createDepartment
}