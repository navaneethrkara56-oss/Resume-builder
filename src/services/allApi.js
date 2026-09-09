import apiService from "../api/apiServices";

// Add Resume
export const addResumeAPI = async (reqBody) => {
  return await apiService("POST", "/allResumes", reqBody);
};

// Get Single Resume
export const getSingleResumeAPI = async (id) => {
  return await apiService("GET", `/allResumes/${id}`, {});
};

// Add Download History
export const addDownloadHistory = async (reqBody) => {
  return await apiService("POST", "/history", reqBody);
};

// Get Download History
export const getDownloadedResumeAPI = async () => {
  return await apiService("GET", "/history", {});
};

// Delete Download History
export const deleteDownloadHistoryAPI = async (id) => {
  return await apiService("DELETE", `/history/${id}`, {});
};

// Update Resume
export const updateResumeAPI = async (id, reqBody) => {
  return await apiService("PUT", `/allResumes/${id}`, reqBody);
};