import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://esgoo.net/api-tinhthanh/',
});

export const addressService = {
    getProvince() {
        return axiosInstance.get(`/1/0.htm`)
    },
    // getProvinceById(id) {
    //     return axiosInstance.get(`/provinces/${id}`)
    // },
    getDistrict(id) {
        return axiosInstance.get(`/2/${id}.htm`)
    },
    // getDistrictById(id) {
    //     return axiosInstance.get(`/districts/${id}`)
    // },
    getWard(id) {
        return axiosInstance.get(`3/${id}.htm`)
    },
    // getWardById(id) {
    //     return axiosInstance.get(`/wards/${id}`)
    // },
    getAll() {
        return axiosInstance.get(`4/0.htm`)
    },
    getDetailAddress(id) {
        return axiosInstance.get(`5/${id}.htm`)
    }
};
