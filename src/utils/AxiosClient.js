import axios from "axios";
import API_CONSTANT from "../constants/apiConstant";
// import { toast } from "react-toastify";
import Toast from "../component/Core/Toast";

const axiosClient = axios.create({
  baseURL: API_CONSTANT.API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: false,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers[
      `${API_CONSTANT.API_HEADER_KEY}`
    ] = `${API_CONSTANT.API_HEADER_VALUE}`;
    return config;
  },
  (error) => {
    <Toast
      open={true}
      autoHideDuration={3000}
      toastSeverity="error"
      message={error.message}
    />;
    // toast.error("Token is required.");
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
