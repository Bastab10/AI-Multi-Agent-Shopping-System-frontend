import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import RecommendationCard from "../components/RecommendationCard";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import api from "../services/api";
import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
} from "../services/wishlistApi";
import { Search, Sparkles } from "lucide-react";
import heroImage from "../assets/hero-shopping.jpg";

function Home() {
  const [products, setProducts] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Wishlist from MongoDB
  const [wishlist, setWishlist] = useState([]);

  // Compare (still LocalStorage)
  const [compareProducts, setCompareProducts] = useState(() => {
    const saved = localStorage.getItem("compareProducts");
    return saved ? JSON.parse(saved) : [];
  });

  const [compareMessage, setCompareMessage] = useState("");

  // Load Wishlist
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Save Compare
  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts));
  }, [compareProducts]);

  // Toggle Wishlist
  const toggleWishlist = async (product) => {
    try {
      const exists = wishlist.find((item) => item.productId === product.id);

      if (exists) {
        await removeWishlistItem(exists._id);
      } else {
        await addToWishlist(product);
      }

      await loadWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Compare
  const toggleCompare = (product) => {
    const exists = compareProducts.find((item) => item.id === product.id);

    if (exists) {
      setCompareProducts(
        compareProducts.filter((item) => item.id !== product.id),
      );
      return;
    }

    if (compareProducts.length >= 3) {
      setCompareMessage("Maximum 3 products can be compared.");

      setTimeout(() => {
        setCompareMessage("");
      }, 3000);

      return;
    }

    setCompareProducts([...compareProducts, product]);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");

      setHistory((prev) => {
        const updated = [query, ...prev.filter((item) => item !== query)];
        return updated.slice(0, 5);
      });

      const res = await api.get(`/products/search?q=${query}`);

      setProducts(res.data.products);

      const aiRecommendation =
        typeof res.data.recommendation === "string"
          ? JSON.parse(res.data.recommendation)
          : res.data.recommendation;

      setRecommendation(aiRecommendation);
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please try again.");

      setProducts([]);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        wishlistCount={wishlist.length}
        compareCount={compareProducts.length}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-screen-2xl mx-auto px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Shopping
              </div>

              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                AI Multi-Agent
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  Shopping System
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Discover the best products with AI Search, Smart
                Recommendations and Product Comparison. Experience the future
                of online shopping.
              </p>

              <div className="max-w-xl">
                <SearchBar onSearch={handleSearch} loading={loading} />
              </div>

              {history.length > 0 && (
                <div className="max-w-xl mt-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {history.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(item)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative hidden lg:flex justify-center animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-20"></div>
              <img
                src={heroImage}
                alt="AI-powered online shopping"
                className="relative w-full max-w-md rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
                <span className="text-gray-500 font-normal text-lg ml-2">
                  ({products.length} products)
                </span>
              </h2>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 text-blue-600">
                  <Search className="w-5 h-5 animate-spin" />
                  <span className="font-semibold">Searching Products...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-center">
                {error}
              </div>
            )}

            {compareMessage && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-700 text-center mb-4">
                {compareMessage}
              </div>
            )}

            <RecommendationCard recommendation={recommendation} />

            <ProductGrid
              products={products}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              compareProducts={compareProducts}
              toggleCompare={toggleCompare}
              onViewProduct={openProductModal}
            />
          </div>
        </section>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} />
      )}

      <Footer />
    </>
  );
}

export default Home;
