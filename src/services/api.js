import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-multi-agent-shopping-system-production.up.railway.app/api",
});

export default api;