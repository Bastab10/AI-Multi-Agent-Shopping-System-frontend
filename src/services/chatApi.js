import api from "./api";

export const sendChatMessage = async (conversationHistory) => {
  const response = await api.post("/chat", {
    conversationHistory,
  });

  return response.data;
};