import axiosInstance from "@/utils/axiosInstance";

const userService = {
  getDepartment(query = "") {
    return axiosInstance.get(`api/getDepartmenHome${query}`);
  },
  getDoctor(query = "") {
    return axiosInstance.get(`api/getDoctorHome`, { params: query });
  },
  getSpecialty(query = "") {
    return axiosInstance.get(`api/getSpcialtyHome`, { params: query });
  },
  getDoctorDetail(query = "") {
    return axiosInstance.get(`api/getUserById`, { params: query })
  },
  getHandbook(query = "") {
    return axiosInstance.get(`api/getHandBookHome`, { params: query })
  },
  getScheduleApoinment(query = "") {
    return axiosInstance.get(`api/getScheduleApoinment`, { params: query })
  },
  getFolk() {
    return axiosInstance.get(`api/getFolk`);
  },
  getUserById(query = "") {
    return axiosInstance.get(`/api/getProfile`, { params: query });
  },
  confirmBooking(data) {
    return axiosInstance.post(`/api/confirmBooking`, data);
  },
  confirmTokenBooking(data) {
    return axiosInstance.post(`/api/confirmTokenBooking`, data);
  },
  getAppoinment(query = "") {
    return axiosInstance.get(`/api/getAppoinment`, { params: query });
  }
};

export default userService