// Home.jsx
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

import { Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Headphone from "../assets/headphone.jpg";
import VR from "../assets/vr.jpg";
import Laptop from "../assets/laptop.jpg";

const HeroData = [
  {
    id: 1,
    img: Headphone,
    subtitle: "Beats Solo",
    title: "Wireless",
    title2: "HEADPHONE",
    description:
      "Experience premium sound quality with powerful bass, crystal-clear audio, and all-day comfort.",
  },
  {
    id: 2,
    img: VR,
    subtitle: "VR Gaming",
    title: "Virtual",
    title2: "REALITY",
    description:
      "Step into immersive virtual worlds with AI-powered recommendations.",
  },
  {
    id: 3,
    img: Laptop,
    subtitle: "MacBook Pro",
    title: "Powerful",
    title2: "LAPTOP",
    description:
      "Find the best laptop deals with smart AI comparison.",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [compareProducts, setCompareProducts] = useState(() => {
    const saved = localStorage.getItem("compareProducts");
    return saved ? JSON.parse(saved) : [];
  });
  const [compareMessage, setCompareMessage] = useState("");

  useEffect(() => { loadWishlist(); }, []);
  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts));
  }, [compareProducts]);

  const loadWishlist = async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.data.data);
    } catch {}
  };

  const toggleWishlist = async (product) => {
    const exists = wishlist.find((i) => i.productId === product.id);
    if (exists) await removeWishlistItem(exists._id);
    else await addToWishlist(product);
    loadWishlist();
  };

  const toggleCompare = (product) => {
    const exists = compareProducts.find((i) => i.id === product.id);
    if (exists)
      return setCompareProducts(compareProducts.filter((i) => i.id !== product.id));

    if (compareProducts.length >= 3) {
      setCompareMessage("Maximum 3 products can be compared.");
      setTimeout(() => setCompareMessage(""), 3000);
      return;
    }
    setCompareProducts([...compareProducts, product]);
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");
      setHistory((p) => [query, ...p.filter((i) => i !== query)].slice(0,5));
      const res = await api.get(`/products/search?q=${query}`);
      setProducts(res.data.products);
      setRecommendation(
        typeof res.data.recommendation === "string"
          ? JSON.parse(res.data.recommendation)
          : res.data.recommendation
      );
    } catch {
      setError("Something went wrong.");
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

      <div className="container mx-auto py-10">
        <div className="bg-gray-100 rounded-3xl overflow-hidden min-h-[600px] flex items-center">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop
            className="w-full"
          >
            {HeroData.map((data) => (
              <SwiperSlide key={data.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-8 py-10">
                  <div>
                    <p className="text-gray-500 font-semibold">{data.subtitle}</p>
                    <h1 className="text-5xl font-bold mt-3">{data.title}</h1>
                    <h2 className="text-7xl font-black text-gray-200">{data.title2}</h2>
                    <p className="text-gray-500 mt-4">{data.description}</p>

                    <div className="mt-6 max-w-lg">
                      <SearchBar onSearch={handleSearch} loading={loading} />
                    </div>

                    {history.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {history.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => handleSearch(item)}
                            className="px-3 py-1 border rounded-full text-sm hover:bg-white"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={data.img}
                      alt={data.title}
                      className="w-[320px] md:w-[450px] object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {loading && (
          <div className="flex items-center gap-2 text-blue-600 mb-6">
            <Search className="animate-spin" size={20} />
            Searching...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {compareMessage && (
          <div className="bg-yellow-100 text-yellow-700 rounded-lg p-4 mb-6">
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
          onViewProduct={setSelectedProduct}
        />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>

      <Footer />
    </>
  );
}
