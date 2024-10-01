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
    return axios.delete(`/api/user/delete`, { data: { id: data.id } })
}
const updateUser = (data) => {
    return axios.put(`/api/user/update`, data)
}

const deleteRole = (data) => {
    return axios.delete(`/api/role/delete`, { data: { id: data.id } })
}
export {
    handleRegisterUser,
    handleLogin,
    logoutUser,
    getUser,
    deleteUser,
    updateUser,
    deleteRole,
}