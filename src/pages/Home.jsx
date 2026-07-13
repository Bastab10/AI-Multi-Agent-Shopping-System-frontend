import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecommendationCard from "../components/RecommendationCard";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import api from "../services/api";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Open Product Modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  // Close Product Modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Search Products
  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");

      // Search History
      setHistory((prev) => {
        const updated = [
          query,
          ...prev.filter((item) => item !== query),
        ];

        return updated.slice(0, 5);
      });

      const res = await api.get(
        `/products/search?q=${query}`
      );

      setProducts(res.data.products);

      const aiRecommendation =
        typeof res.data.recommendation === "string"
          ? JSON.parse(res.data.recommendation)
          : res.data.recommendation;

      setRecommendation(aiRecommendation);
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Please try again."
      );

      setProducts([]);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar wishlistCount={wishlist.length} />

      <div className="home">
        <h1 className="title">
          🤖 AI Multi-Agent Shopping System
        </h1>

        <SearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        <h2 className="total">
          Total Products : {products.length}
        </h2>

        {loading && (
          <h3 className="loading">
            🔍 Searching Products...
          </h3>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {!loading &&
          products.length === 0 &&
          !error && (
            <p className="empty">
              Search any product to begin.
            </p>
          )}

        {history.length > 0 && (
          <div className="history">
            <h3>🕒 Recent Searches</h3>

            <div className="history-list">
              {history.map((item, index) => (
                <button
                  key={index}
                  className="history-btn"
                  onClick={() =>
                    handleSearch(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <RecommendationCard
          recommendation={recommendation}
        />

        <ProductGrid
          products={products}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onViewProduct={openProductModal}
        />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeProductModal}
          />
        )}
      </div>
    </>
  );
}

export default Home;