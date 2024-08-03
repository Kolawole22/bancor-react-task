import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://quizapi.laspg-online.com/api", // Replace with your actual base URL
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace with your token storage mechanism

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
