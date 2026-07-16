import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-multi-agent-shopping-system.onrender.com/api",
});

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export default API;