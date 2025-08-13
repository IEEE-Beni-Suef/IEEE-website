import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://ieee.runasp.net/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
