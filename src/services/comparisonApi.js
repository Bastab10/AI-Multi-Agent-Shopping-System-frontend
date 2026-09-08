import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://ai-multi-agent-shopping-system.onrender.com/api",

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const compareProducts = (products) => {
  return API.post("/comparison", {
    products,
  });
};

export default API;