import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://ai-multi-agent-shopping-system-production-fe33.up.railway.app/api",

});

export default api;