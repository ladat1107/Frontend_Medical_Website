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
const deleteRole = (data) => {
    return axios.delete(`/api/role/delete`, { data: { id: data.id } })
}
const getNameDepartment = () => {
    return axios.get(`/api/getAllNameDepartment`)
}
export {
    handleRegisterUser,
    handleLogin,
    logoutUser,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    deleteRole,
    getNameDepartment,
}