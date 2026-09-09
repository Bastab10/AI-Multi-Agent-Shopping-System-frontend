import api from "./api";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getWishlist = () => {
  return api.get("/wishlist");
};

export const addToWishlist = (product) => {
  return api.post("/wishlist", {
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
  return api.delete(`/wishlist/${id}`);
};

export const clearWishlist = () => {
  return api.delete("/wishlist");
};