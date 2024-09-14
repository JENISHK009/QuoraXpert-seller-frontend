import axiosClient from "../utils/AxiosClient";

const expertAuthApi = {
  loginUser(data) {
    const url = `xpert/noAuth/login`;
    return axiosClient.post(url, data.payload);
  },
  signUpUser(data) {
    const url = `xpert/noAuth/signup`;
    return axiosClient.post(url, data.payload);
  },
  addProfile(data) {
    const url = `xpert/noAuth/addProfile`;
    return axiosClient.post(url, data.payload);
  },
  verifySignUpOtp(data) {
    const url = `xpert/noAuth/verifySignUpOtp`;
    return axiosClient.post(url, data.payload);
  },
  getCategories(data) {
    const url = `/xpert/category/getCategories`;
    return axiosClient.get(url, data.payload);
  },
  updateProfile(data) {
    const url = `xpert/auth/updateProfile`;
    return axiosClient.post(url, data.payload);
  },
  updatePassword(data) {
    const url = `xpert/noAuth/updatePassword`;
    return axiosClient.put(url, data.payload);
  },
  forgotPassword(data) {
    const url = `xpert/noAuth/forgotPassword`;
    return axiosClient.put(url, data.payload);
  },
  resetPassword(data) {
    const url = `xpert/auth/forgotPassword`;
    return axiosClient.post(url, data.payload);
  },
  reSendOtp(data) {
    const url = `xpert/noAuth/resendOtp`;
    return axiosClient.post(url, data.payload);
  },

  // userLogout(data) {
  //   const url = `users/superAdminLogout`;
  //   return axiosClient.post(url, data.payload);
  // },
};

export default expertAuthApi;
