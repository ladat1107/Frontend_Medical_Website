import axios from "@/utils/axiosInstance";

export const handleRegisterUser = (data) => {
    return axios.post(`/api/registerUser`, data)
}
export const handleLogin = (data) => {
    return axios.post(`/handleLogin`, data)
}
export const logoutUser = () => {
    return axios.post(`/handleLogout`)
}
// USER MANAGEMENT
export const createUser = (data) => {
    return axios.post(`/api/admin/createUser`, data)
}
export const getUser = (page, limit, search, position) => {
    return axios.get(`/api/admin/getAllUser?page=${+page}&limit=${+limit}&position=[${position}]&search=${search}`)
}
export const updateProfileInfo = (data) => {
    return axios.put(`/api/profileUpdateInfo`, data)
}
export const updateProfilePassword = (data) => {
    return axios.put(`/api/profileUpdatePassword`, data)
}
export const getUserById = (id) => {
    return axios.get(`/api/getUserById?id=${id}`)
}
export const deleteUser = (data) => {
    return axios.delete(`/api/admin/deleteUser`, { data: { id: data.id } })
}
export const updateUser = (data) => {
    return axios.put(`/api/admin/updateUser`, data)
}
export const blockUser = (data) => {
    return axios.put(`/api/admin/blockUser`, data)
}
export const getStaffByRole = (role) => {
    return axios.get(`/api/getStaffByRole?roleId=${role}`)
}
export const profileUpdateStaff = (data) => {
    return axios.put(`/api/profileUpdateStaff`, data)
}

// DEPARTMENT MANAGEMENT
export const createDepartment = (data) => {
    return axios.post(`/api/admin/createDepartment`, data)
}
export const getNameDepartment = () => {
    return axios.get(`/api/getAllNameDepartment`)
}
export const getDepartment = (page, limit, search) => {
    return axios.get(`/api/getAllDepartment?page=${+page}&limit=${+limit}&search=${search}`)
}
export const getDepartmentById = (id) => {
    return axios.get(`/api/getDepartmentById?id=${id}`)
}
export const deleteDepartment = (data) => {
    return axios.delete(`/api/admin/deleteDepartment `, { data: { id: data.id } })
}
export const updateDepartment = (data) => {
    return axios.put(`/api/admin/updateDepartment`, data)
}
export const blockDepartment = (data) => {
    return axios.put(`/api/admin/blockDepartment`, data)
}

// SERVICE OF ROOM MANAGEMENT
export const getServiceOfRoom = (page, limit, search) => {
    return axios.get(`/api/admin/getAllServiceTypes?page=${+page}&limit=${+limit}&search=${search}`)
}
export const getServiceSearch = () => {
    return axios.get(`/api/admin/getServiceSearch`)
}
export const getServiceById = (id) => {
    return axios.get(`/api/getServiceTypeById?id=${id}`)
}
export const deleteServiceOfRoom = (data) => {
    return axios.delete(`/api/admin/deleteServiceType`, { data: { id: data.id } })
}
export const updateServiceOfRoom = (data) => {
    return axios.put(`/api/admin/updateServiceType`, data)
}
export const blockServiceOfRoom = (data) => {
    return axios.put(`/api/admin/blockServiceType`, data)
}
export const createServiceOfRoom = (data) => {
    return axios.post(`/api/admin/createServiceType`, data)
}

// ROOM MANAGEMENT
export const createRoom = (data) => {
    return axios.post(`/api/admin/createRoom`, data)
}
export const getAllRoom = (page, limit, search, searchDepartment) => {
    return axios.get(`/api/admin/getAllRoomAdmin?page=${+page}&limit=${+limit}&search=${search}&searchDepartment=${searchDepartment}`)
}
export const getRoomById = (id) => {
    return axios.get(`/api/getRoomById?id=${id}`)
}
export const updateRoom = (data) => {
    return axios.put(`/api/admin/updateRoom`, data)
}
export const deleteRoom = (data) => {
    return axios.delete(`/api/admin/deleteRoom`, { data: { id: data.id } })
}
export const blockRoom = (data) => {
    return axios.put(`/api/admin/blockRoom`, data)
}

// SPECIALTY MANAGEMENT
export const getSpecialtySelect = () => {
    return axios.get(`/api/getSpecialtySelect`)
}
export const getAllSpecialtyAdmin = (page, limit, search) => {
    return axios.get(`/api/admin/getAllSpecialtyAdmin?page=${+page}&limit=${+limit}&search=${search}`)
}
export const updateSpecialty = (data) => {
    return axios.put(`/api/admin/updateSpecialty`, data)
}
export const createSpecialty = (data) => {
    return axios.post(`/api/admin/createSpecialty`, data)
}
export const deleteSpecialty = (data) => {
    return axios.delete(`/api/admin/deleteSpecialty`, { data: { id: data.id } })
}
export const blockSpecialty = (data) => {
    return axios.put(`/api/admin/blockSpecialty`, data)
}
export const getSpecialtyById = (id) => {
    return axios.get(`/api/getSpecialtyById?id=${id}`)
}