import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-multi-agent-shopping-system.onrender.app/api",
});

export default api;