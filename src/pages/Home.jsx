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


  // =========================
  // LOAD WISHLIST
  // =========================

  useEffect(() => {
    loadWishlist();
  }, []);


  // =========================
  // SAVE COMPARE PRODUCTS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "compareProducts",
      JSON.stringify(compareProducts)
    );
  }, [compareProducts]);


  // =========================
  // LOAD WISHLIST FUNCTION
  // =========================

  const loadWishlist = async () => {
    try {
      const res = await getWishlist();

      setWishlist(res?.data?.data || []);
    } catch (err) {
      console.error("Wishlist loading error:", err);
    }
  };


  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = async (product) => {
    try {
      const exists = wishlist.find(
        (item) => item.productId === product.id
      );

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


  // =========================
  // TOGGLE COMPARE
  // =========================

  const toggleCompare = (product) => {
    const exists = compareProducts.find(
      (item) => item.id === product.id
    );

    // Remove from compare
    if (exists) {
      setCompareProducts(
        compareProducts.filter(
          (item) => item.id !== product.id
        )
      );

      return;
    }

    // Maximum 3 products
    if (compareProducts.length >= 3) {
      setCompareMessage(
        "Maximum 3 products can be compared."
      );

      setTimeout(() => {
        setCompareMessage("");
      }, 3000);

      return;
    }

    // Add product
    setCompareProducts([
      ...compareProducts,
      product,
    ]);
  };


  // =========================
  // SEARCH FUNCTION
  // =========================

  const handleSearch = async (query) => {
    if (!query || !query.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCompareMessage("");

      // Save search history
      setHistory((previousHistory) => [
        query,
        ...previousHistory.filter(
          (item) => item !== query
        ),
      ].slice(0, 5));

      const res = await api.get(
        `/products/search?q=${encodeURIComponent(query)}`
      );

      setProducts(res?.data?.products || []);

      let recommendationData =
        res?.data?.recommendation;

      if (typeof recommendationData === "string") {
        try {
          recommendationData =
            JSON.parse(recommendationData);
        } catch {
          recommendationData = null;
        }
      }

      setRecommendation(
        recommendationData || null
      );
    } catch (err) {
      console.error("Search error:", err);

      setError(
        "Something went wrong while searching. Please try again."
      );

      setProducts([]);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // CHECK WISHLIST
  // =========================

  const isWishlisted = (product) => {
    return wishlist.some(
      (item) => item.productId === product.id
    );
  };


  // =========================
  // CHECK COMPARE
  // =========================

  const isCompared = (product) => {
    return compareProducts.some(
      (item) => item.id === product.id
    );
  };


  return (
    <>
      {/* =========================================
          NAVBAR
      ========================================= */}

      <Navbar />


      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-blue-50">

        {/* Background blobs */}

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl" />

        <div className="absolute top-40 -right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />


        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="hero-swiper"
          >

            {HeroData.map((slide) => (
              <SwiperSlide key={slide.id}>

                <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[520px]">

                  {/* LEFT CONTENT */}

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

                      <span className="text-violet-600">
                        {slide.title2}
                      </span>

                    </h1>


                    <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                      {slide.description}
                    </p>


                    {/* SEARCH */}

                    <div className="mt-8 max-w-2xl">
                      <SearchBar
                        onSearch={handleSearch}
                      />
                    </div>


                    {/* Quick benefits */}

                    <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">

                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        AI Powered
                      </span>

                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        Price Comparison
                      </span>

                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-violet-500 rounded-full" />
                        Smart Recommendations
                      </span>

                    </div>

                  </motion.div>


                  {/* RIGHT VISUAL */}

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

                    {/* Main product image */}

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


                      {/* Floating products */}

                      {slide.id === 1 && (
                        <>
                          <motion.img
                            src={Headphone}
                            alt="Headphone"
                            animate={{
                              y: [0, -15, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 top-10 left-2 object-contain"
                          />

                          <motion.img
                            src={Watch}
                            alt="Watch"
                            animate={{
                              y: [0, 15, 0],
                            }}
                            transition={{
                              duration: 3.5,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 bottom-12 left-4 object-contain"
                          />

                          <motion.img
                            src={Phone}
                            alt="Phone"
                            animate={{
                              y: [0, -12, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                            }}
                            className="absolute z-20 w-24 sm:w-28 bottom-10 right-2 object-contain"
                          />

                          <motion.img
                            src={VR}
                            alt="VR"
                            animate={{
                              y: [0, 12, 0],
                            }}
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


      {/* =========================================
          SEARCH RESULTS SECTION
      ========================================= */}

      <main className="container mx-auto px-4 py-10">


        {/* SEARCH HISTORY */}

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


        {/* LOADING */}

        {loading && (
          <div className="flex items-center gap-3 text-blue-600 mb-6">

            <Search
              className="animate-spin"
              size={20}
            />

            <span className="font-medium">
              Searching...
            </span>

          </div>
        )}


        {/* ERROR */}

        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-4 mb-6 border border-red-200">
            {error}
          </div>
        )}


        {/* COMPARE MESSAGE */}

        {compareMessage && (
          <div className="bg-yellow-100 text-yellow-700 rounded-lg p-4 mb-6 border border-yellow-200">
            {compareMessage}
          </div>
        )}


        {/* =========================================
            AI RECOMMENDATION
        ========================================= */}

        {recommendation && !loading && (
          <section className="mb-12">

            <RecommendationCard
              recommendation={recommendation}
            />

          </section>
        )}


        {/* =========================================
            PRODUCTS
        ========================================= */}

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
              compareProducts={compareProducts}
              onProductClick={setSelectedProduct}
              onWishlistToggle={toggleWishlist}
              onCompareToggle={toggleCompare}
              isWishlisted={isWishlisted}
              isCompared={isCompared}
            />

          </section>
        )}


        {/* =========================================
            EMPTY STATE
        ========================================= */}

        {!loading &&
          !error &&
          products.length === 0 &&
          history.length === 0 && (
            <section className="py-16 text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-6">

                <Search
                  size={34}
                  className="text-violet-600"
                />

              </div>


              <h2 className="text-2xl font-bold text-gray-900">
                What are you looking for?
              </h2>


              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                Search for laptops, phones, headphones,
                watches, gaming products and more.
              </p>

            </section>
          )}


        {/* =========================================
            COMPARE PRODUCTS
        ========================================= */}

        {compareProducts.length > 0 && (
          <section className="mt-12">

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Products to Compare
                  </h2>

                  <p className="text-sm text-gray-500">
                    {compareProducts.length}/3 products selected
                  </p>

                </div>


                <button
                  onClick={() =>
                    setCompareProducts([])
                  }
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear All
                </button>

              </div>


              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {compareProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-xl p-4 flex items-center gap-4"
                  >

                    <img
                      src={
                        product.image ||
                        product.thumbnail ||
                        product.productImage
                      }
                      alt={product.title}
                      className="w-20 h-20 object-contain"
                    />


                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {product.title}
                      </h3>


                      <p className="text-violet-600 font-bold mt-1">
                        {product.price || "Price unavailable"}
                      </p>

                    </div>


                    <button
                      onClick={() =>
                        toggleCompare(product)
                      }
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>

                  </div>
                ))}

              </div>


              {compareProducts.length >= 2 && (
                <div className="mt-6 flex justify-end">

                  <button
                    onClick={() => {
                      // Navigate to comparison page
                      window.location.href =
                        "/compare";
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
                  >
                    Compare Products

                    <FaArrowRight size={14} />

                  </button>

                </div>
              )}

            </div>

          </section>
        )}

      </main>


      {/* =========================================
          PRODUCT MODAL
      ========================================= */}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />
      )}


      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />

    </>
  );
}