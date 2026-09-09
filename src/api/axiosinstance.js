import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://resume-builder-server-3-nf3b.onrender.com",
  timeout: 5000
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received");
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.log("Unauthorized access - 401");
      } else if (status === 404) {
        console.log("API not found - 404");
      } else if (status === 500) {
        console.log("Server error - 500");
      } else {
        console.log("Error " + error.message);
      }
    } else if (error.request) {
      console.log("No response from server");
    } else {
      console.log("Error " + error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;