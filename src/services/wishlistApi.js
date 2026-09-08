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

export const getWishlist = () => {
  return API.get("/wishlist");
};

export const addToWishlist = (product) => {
  return API.post("/wishlist", {
    productId: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    rating: product.rating,
    reviews: product.reviews,
    link: product.link,
  });
};

export const removeWishlistItem = (id) => {
  return API.delete(`/wishlist/${id}`);
};

export const clearWishlist = () => {
  return API.delete("/wishlist");
};

export default API;