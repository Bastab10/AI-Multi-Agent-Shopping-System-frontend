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

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaCode,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";

import { Search } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Headphone from "../assets/headphone.png";
import VR from "../assets/vr.png";
import Laptop from "../assets/laptop.png";
import Watch from "../assets/watch.png";
import Phone from "../assets/phone.png";

const HeroData = [
  {
    id: 1,
    laptop: Laptop,
    headphone: Headphone,
    watch: Watch,
    phone: Phone,
    vr: VR,
    subtitle: "AI Shopping Assistant",
    title: "Smart",
    title2: "SHOPPING",
    description:
      "Search millions of products, compare prices instantly, and get AI-powered recommendations tailored to your needs.",
  },
  {
    id: 2,
    img: VR,
    subtitle: "Compare Before You Buy",
    title: "AI",
    title2: "COMPARISON",
    description:
      "Compare features, prices, ratings, and reviews across multiple products to make the best buying decision.",
  },
  {
    id: 3,
    img: Laptop,
    subtitle: "Find the Best Deals",
    title: "Best",
    title2: "OFFERS",
    description:
      "Discover trending products, exclusive discounts, and personalized recommendations powered by intelligent AI agents.",
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
    try {
      const saved = localStorage.getItem("compareProducts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareMessage, setCompareMessage] = useState("");

  useEffect(() => {
    loadWishlist();
  }, []);
  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts));
  }, [compareProducts]);
  const loadWishlist = async () => {
    try {
      const res = await getWishlist();

      setWishlist(res?.data?.data || []);
    } catch (err) {
      console.error("Wishlist loading error:", err);
    }
  };

  const toggleWishlist = async (product) => {
    try {
      const exists = wishlist.find((item) => item.productId === product.id);

      if (exists) {
        await removeWishlistItem(exists._id);
      } else {
        await addToWishlist(product);
      }

      await loadWishlist();
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

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
  const handleSearch = async (query) => {
    if (!query || !query.trim()) {
      return;
    }

    const trimmedQuery = query.trim();

    try {
      setLoading(true);
      setError("");
      setCompareMessage("");

      setHistory((previousHistory) =>
        [
          trimmedQuery,
          ...previousHistory.filter((item) => item !== trimmedQuery),
        ].slice(0, 5),
      );
      const res = await api.get(
        `/products/search?q=${encodeURIComponent(trimmedQuery)}`,
      );

      setProducts(res?.data?.products || []);

      let recommendationData = res?.data?.recommendation;

      if (typeof recommendationData === "string") {
        try {
          recommendationData = JSON.parse(recommendationData);
        } catch {
          recommendationData = null;
        }
      }

      setRecommendation(recommendationData || null);
    } catch (err) {
      console.error("Search error:", err);

      setError("Something went wrong while searching. Please try again.");

      setProducts([]);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };
  const isWishlisted = (product) => {
    return wishlist.some((item) => item.productId === product.id);
  };
  const isCompared = (product) => {
    return compareProducts.some((item) => item.id === product.id);
  };

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-blue-50">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl" />

        <div className="absolute top-40 -right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            className="hero-swiper"
          >
            {HeroData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[520px]">
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -40,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                  >
                    <span className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-sm font-semibold">
                      {slide.subtitle}
                    </span>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[0.95]">
                      {slide.title}

                      <br />

                      <span className="text-violet-600">{slide.title2}</span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="mt-8 max-w-2xl">
                      <SearchBar
                        onSearch={handleSearch}
                        loading={loading}
                      />{" "}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="relative flex justify-center items-center"
                  >
                    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                      <div className="absolute inset-10 rounded-full bg-violet-200/40 blur-3xl" />

                      {slide.img ? (
                        <img
                          src={slide.img}
                          alt={slide.title2}
                          className="relative z-10 w-72 sm:w-80 lg:w-[400px] object-contain drop-shadow-2xl"
                        />
                      ) : (
                        <img
                          src={Laptop}
                          alt="Smart shopping"
                          className="relative z-10 w-72 sm:w-80 lg:w-[400px] object-contain drop-shadow-2xl"
                        />
                      )}

                      {slide.id === 1 && (
                        <>
                          <motion.img
                            src={Headphone}
                            alt="Headphone"
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 top-10 left-2 object-contain"
                          />

                          <motion.img
                            src={Watch}
                            alt="Watch"
                            transition={{
                              duration: 3.5,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 bottom-12 left-4 object-contain"
                          />

                          <motion.img
                            src={Phone}
                            alt="Phone"
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 bottom-10 right-2 object-contain"
                          />

                          <motion.img
                            src={VR}
                            alt="VR"
                            transition={{
                              duration: 3.2,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 top-10 right-4 object-contain"
                          />
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        {history.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Searches
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {history.map((item, index) => (
                <button
                  key={`${item}-${index}`}
                  onClick={() => handleSearch(item)}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-700 text-sm transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 text-blue-600 mb-6">
            <Search className="animate-spin" size={20} />

            <span className="font-medium">Searching...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-4 mb-6 border border-red-200">
            {error}
          </div>
        )}

        {compareMessage && (
          <div className="bg-yellow-100 text-yellow-700 rounded-lg p-4 mb-6 border border-yellow-200">
            {compareMessage}
          </div>
        )}

        {recommendation && !loading && (
          <section className="mb-12">
            <RecommendationCard
              recommendation={recommendation}
              products={products}
            />{" "}
          </section>
        )}

        {products.length > 0 && !loading && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Search Results
                </h2>

                <p className="text-gray-500 mt-1">
                  Found {products.length} products
                </p>
              </div>
            </div>

            <ProductGrid
              products={products}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              onViewProduct={setSelectedProduct}
              compareProducts={compareProducts}
              toggleCompare={toggleCompare}
            />
          </section>
        )}
      </main>

      {/* =========================================
          PRODUCT MODAL
      ========================================= */}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />
    </>
  );
}
