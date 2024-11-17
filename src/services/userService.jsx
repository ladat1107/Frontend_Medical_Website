import axiosInstance from "@/utils/axiosInstance";

const userService = {
  getDepartment(query = "") {
    return axiosInstance.get(`api/getDepartmenHome${query}`);
  },
  getDoctor(query = "") {
    return axiosInstance.get(`api/getDoctorHome${query}`)
  },
  getSpecialty(query="") {
    return axiosInstance.get(`api/getSpcialtyHome${query}`)
  }
};

export default userService