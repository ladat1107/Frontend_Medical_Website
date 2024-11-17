import axiosInstance from "@/utils/axiosInstance";

const userService = {
  getDepartment(query = "") {
    return axiosInstance.get(`api/getDepartmenHome${query}`);
  },
};

export default userService