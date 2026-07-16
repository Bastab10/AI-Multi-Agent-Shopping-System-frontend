import axios from "axios";

const api = axios.create({

    baseURL:"https://ai-multi-agent-shopping-system.onrender.com/api"

});

export default api;