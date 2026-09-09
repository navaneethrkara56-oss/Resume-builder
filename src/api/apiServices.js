import axiosInstance from "./axiosInstance";

const apiService = async (httpMethod, url, reqBody) => {
  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody,
  };

  try {
    const response = await axiosInstance(reqConfig);
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiService;