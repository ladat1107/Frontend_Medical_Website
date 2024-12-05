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
  }
};

export default userService