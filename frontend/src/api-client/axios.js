import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
