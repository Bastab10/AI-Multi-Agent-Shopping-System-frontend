import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get Wishlist
export const getWishlist = () => {
  return API.get("/wishlist");
};

// Add Product
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

// Remove Product
export const removeWishlistItem = (id) => {
  return API.delete(`/wishlist/${id}`);
};

// Clear Wishlist
export const clearWishlist = () => {
  return API.delete("/wishlist");
};

export default API;