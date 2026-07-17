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
    const saved = localStorage.getItem("compareProducts");
    return saved ? JSON.parse(saved) : [];
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
      return setCompareProducts(
        compareProducts.filter((i) => i.id !== product.id),
      );

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
      setHistory((p) => [query, ...p.filter((i) => i !== query)].slice(0, 5));
      const res = await api.get(`/products/search?q=${query}`);
      setProducts(res.data.products);
      setRecommendation(
        typeof res.data.recommendation === "string"
          ? JSON.parse(res.data.recommendation)
          : res.data.recommendation,
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
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-5 sm:px-8 py-10">
                  {" "}
                  <div>
                    <p className="text-sm sm:text-base text-gray-500 font-semibold">
                      {" "}
                      {data.subtitle}
                    </p>
                    <h1 className="text-5xl font-bold mt-3">{data.title}</h1>
                    <h2
                      className="font-black text-gray-400
               text-6xl
               sm:text-5xl
               md:text-6xl
               lg:text-7xl
               leading-none
               break-words"
                    >
                      {data.title2}
                    </h2>
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
                  <div className="relative h-[520px] w-full overflow-hidden">
                    {" "}
                    {/* Background Circle */}
                    <div className="absolute w-[420px] h-[420px] rounded-full bg-violet-200/40 right-16 top-12 blur-sm"></div>{" "}
                    {/* Laptop */}
                    <img
                      src={data.laptop}
                      className="absolute left-24 top-24 w-[330px] -rotate-12 z-20 drop-shadow-2xl hover:scale-105 duration-300"
                    />
                    {/* Headphone */}
                    <img
                      src={data.headphone}
                      className="absolute right-6 top-0 w-[230px] z-30 drop-shadow-2xl"
                    />
                    {/* Watch */}
                    <img
                      src={data.watch}
                      className="absolute left-48 bottom-16 w-28 rotate-[-15deg] z-20"
                    />
                    {/* Phone */}
                    <img
                      src={data.phone}
                      className="absolute right-6 bottom-0 w-36 rotate-[18deg] z-10"
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
