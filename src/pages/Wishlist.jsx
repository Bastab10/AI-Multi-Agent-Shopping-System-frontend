import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import "../styles/ProductCard.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar wishlistCount={wishlist.length} />

      <div className="home">
        <h1 className="title">❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (
          <h2 className="empty">
            Your Wishlist is Empty
          </h2>
        ) : (
          <div className="product-grid">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="product-card"
              >
                <img
                  src={product.image}
                  alt={product.title}
                />

                <h3>{product.title}</h3>

                <p>💰 {product.price}</p>

                <p>⭐ {product.rating}</p>

                <button
                  className="buy-btn"
                  onClick={() => removeItem(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;