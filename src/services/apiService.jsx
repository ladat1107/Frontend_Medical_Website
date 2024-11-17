import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.nosomovo.xyz/',
    withCredentials: false,
});
export const apiService = {
    getAllFolk() {
        return axiosInstance.get(`/ethnic/getalllist/`)
    },
    getAllProvince() {
        return axiosInstance.get(`/province/getalllist/193`)
    },
    getDistrictByProvinceId(id) {
        return axiosInstance.get(`/district/getalllist/${id}`)
    },
    getWardByDistrictId(id) {
        return axiosInstance.get(`/commune/getalllist/${id}`)
    },
}