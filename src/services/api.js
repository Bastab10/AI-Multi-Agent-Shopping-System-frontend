import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://ai-multi-agent-shopping-system.onrender.com/api",

});

export default api;