import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import RecommendationCard from "../components/RecommendationCard";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
} from "../services/wishlistApi";

import { motion } from "framer-motion";

import Headphone from "../assets/headphone.png";
import VR from "../assets/vr.png";
import Laptop from "../assets/laptop.png";
import Watch from "../assets/watch.png";
import Phone from "../assets/phone.png";

import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, loading, setCompareCount } = useAuth();

  const [products, setProducts] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [compareMessage, setCompareMessage] = useState("");

  const resultsRef = useRef(null);
  const shouldScrollToResults = useRef(false);
  const compareTimeoutRef = useRef(null);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      localStorage.removeItem("searchProducts");
      localStorage.removeItem("compareProducts");

      setProducts([]);
      setRecommendation(null);
      setComparison(null);
      setSelectedProduct(null);
      setWishlist([]);
      setCompareProducts([]);
      setCompareMessage("");
      setCompareCount(0);

      return;
    }

    try {
      const savedProducts = localStorage.getItem("searchProducts");

      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);

        setProducts(Array.isArray(parsedProducts) ? parsedProducts : []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Products loading error:", error);

      setProducts([]);
    }

    try {
      const savedCompareProducts = localStorage.getItem("compareProducts");

      if (savedCompareProducts) {
        const parsedCompareProducts = JSON.parse(savedCompareProducts);

        const updatedCompareProducts = Array.isArray(parsedCompareProducts)
          ? parsedCompareProducts
          : [];

        setCompareProducts(updatedCompareProducts);

        setCompareCount(updatedCompareProducts.length);
      } else {
        setCompareProducts([]);
        setCompareCount(0);
      }
    } catch (error) {
      console.error("Compare products loading error:", error);

      setCompareProducts([]);
      setCompareCount(0);
    }

    loadWishlist();
  }, [user, loading, setCompareCount]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const clearHomeState = () => {
      sessionStorage.removeItem("clearHomeProducts");

      localStorage.removeItem("searchProducts");

      localStorage.removeItem("compareProducts");

      setProducts([]);
      setRecommendation(null);
      setComparison(null);
      setSelectedProduct(null);
      setWishlist([]);
      setCompareProducts([]);
      setCompareMessage("");
      setCompareCount(0);
    };

    const handleClearHomeProducts = () => {
      clearHomeState();
    };

    const handleLogout = () => {
      clearHomeState();
    };

    if (sessionStorage.getItem("clearHomeProducts") === "true") {
      clearHomeState();
    }

    window.addEventListener("clear-home-products", handleClearHomeProducts);

    window.addEventListener("auth-logout", handleLogout);

    return () => {
      window.removeEventListener(
        "clear-home-products",
        handleClearHomeProducts,
      );

      window.removeEventListener("auth-logout", handleLogout);
    };
  }, [setCompareCount]);

  useEffect(() => {
    const handleCompareUpdated = () => {
      if (!user) {
        setCompareProducts([]);
        setCompareCount(0);
        return;
      }

      try {
        const saved = localStorage.getItem("compareProducts");

        const parsed = saved ? JSON.parse(saved) : [];

        const updated = Array.isArray(parsed) ? parsed : [];

        setCompareProducts(updated);
        setCompareCount(updated.length);
      } catch (error) {
        console.error("Compare update error:", error);

        setCompareProducts([]);
        setCompareCount(0);
      }
    };

    window.addEventListener("compare-updated", handleCompareUpdated);

    return () => {
      window.removeEventListener("compare-updated", handleCompareUpdated);
    };
  }, [user, setCompareCount]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      localStorage.removeItem("searchProducts");
      return;
    }

    if (products.length > 0) {
      localStorage.setItem("searchProducts", JSON.stringify(products));
    }
  }, [products, user, loading]);

  useEffect(() => {
    if (shouldScrollToResults.current && products.length > 0) {
      const timer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        shouldScrollToResults.current = false;
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [products]);

  useEffect(() => {
    return () => {
      if (compareTimeoutRef.current) {
        clearTimeout(compareTimeoutRef.current);
      }
    };
  }, []);

  const loadWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const res = await getWishlist();

      setWishlist(res?.data?.data || []);
    } catch (error) {
      console.error("Wishlist loading error:", error);

      setWishlist([]);
    }
  };

  const toggleWishlist = async (product) => {
    if (!user) {
      return;
    }

    try {
      const exists = wishlist.find((item) => item.productId === product.id);

      if (exists) {
        await removeWishlistItem(exists._id);
      } else {
        await addToWishlist(product);
      }

      await loadWishlist();
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  const toggleCompare = (product) => {
    if (!user) {
      return;
    }

    let currentProducts = [];

    try {
      const saved = localStorage.getItem("compareProducts");

      const parsed = saved ? JSON.parse(saved) : [];

      currentProducts = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Compare parsing error:", error);

      currentProducts = [];
    }

    const isAlreadyCompared = currentProducts.some(
      (item) => item.id === product.id,
    );

    if (isAlreadyCompared) {
      const updatedProducts = currentProducts.filter(
        (item) => item.id !== product.id,
      );

      localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));

      setCompareProducts(updatedProducts);

      setCompareCount(updatedProducts.length);

      window.dispatchEvent(new Event("compare-updated"));

      return;
    }

    if (currentProducts.length >= 3) {
      if (compareTimeoutRef.current) {
        clearTimeout(compareTimeoutRef.current);
      }

      setCompareMessage("You can compare maximum 3 products.");

      compareTimeoutRef.current = setTimeout(() => {
        setCompareMessage("");
      }, 3000);

      return;
    }

    const updatedProducts = [...currentProducts, product];

    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));

    setCompareProducts(updatedProducts);

    setCompareCount(updatedProducts.length);

    window.dispatchEvent(new Event("compare-updated"));
  };

  const handleProductsFound = (newProducts) => {
    if (!user) {
      return;
    }

    if (!Array.isArray(newProducts) || newProducts.length === 0) {
      return;
    }

    shouldScrollToResults.current = true;
    setProducts(newProducts);
  };

  const handleRecommendationFound = (newRecommendation) => {
    if (!user) {
      return;
    }

    if (!newRecommendation) {
      return;
    }

    setRecommendation(newRecommendation);
  };

  const handleComparisonFound = (newComparison) => {
    if (!user) {
      return;
    }

    if (!newComparison) {
      return;
    }

    setComparison(newComparison);
  };

  const renderComparison = () => {
    if (!comparison) {
      return null;
    }

    if (Array.isArray(comparison)) {
      return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {comparison.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {typeof item === "object" && item !== null ? (
                Object.entries(item).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {key.replace(/_/g, " ")}
                    </p>

                    <p className="mt-1 text-sm text-gray-800">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">{String(item)}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof comparison === "object" && comparison !== null) {
      return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="divide-y divide-gray-200">
            {Object.entries(comparison).map(([key, value]) => (
              <div
                key={key}
                className="grid gap-3 px-6 py-5 md:grid-cols-[220px_1fr]"
              >
                <div className="font-semibold capitalize text-gray-700">
                  {key.replace(/_/g, " ")}
                </div>

                <div className="text-gray-600">
                  {typeof value === "object" ? (
                    <pre className="whitespace-pre-wrap text-sm">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    String(value)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-700 shadow-sm">
        {String(comparison)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {compareMessage && (
        <div
          role="alert"
          className="
            fixed
            top-24
            left-1/2
            z-[999999]
            -translate-x-1/2
            whitespace-nowrap
            rounded-xl
            border
            border-yellow-300
            bg-yellow-50
            px-5
            py-3
            text-sm
            font-semibold
            text-yellow-800
            shadow-xl
            pointer-events-none
          "
        >
          {compareMessage}
        </div>
      )}

      <Navbar />

      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-gradient-to-br from-[#fffaf3] via-[#fff1fa] to-[#eef3ff]">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />

        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-6 py-6 lg:px-10">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex flex-col justify-center"
            >
              <div className="mb-5">
                <h1 className="mt-5 text-5xl font-black leading-[0.9] font-extralight text-gray-950 sm:text-6xl">
                  Smart
                  <br />
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    SHOPPING
                  </span>
                </h1>

                <p className="mt-5 text-gray-600 font-extralight leading-7">
                  AI-powered shopping assistant that helps you compare products,
                  discover better deals and make smarter buying decisions.
                </p>
              </div>

              <div className="w-full max-w-[550px]">
                <Chatbot
                  onProductsFound={handleProductsFound}
                  onRecommendationFound={handleRecommendationFound}
                  onComparisonFound={handleComparisonFound}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="relative flex min-h-[600px] items-center justify-center"
            >
              <div className="relative h-[520px] w-full -translate-y-12 sm:-translate-y-14 lg:-translate-y-20">
                <div className="absolute h-[520px] w-[520px] rounded-full bg-violet-200/25 blur-3xl" />

                <motion.img
                  src={Laptop}
                  alt="Laptop"
                  className="absolute bottom-8 right-8 z-20 w-[350px] object-contain drop-shadow-2xl sm:w-[400px] lg:w-[440px]"
                />

                <motion.img
                  src={Headphone}
                  alt="Headphone"
                  className="absolute left-[12%] top-[15%] z-30 w-20 object-contain sm:w-24"
                />

                <motion.img
                  src={VR}
                  alt="VR"
                  className="absolute right-[5%] top-[22%] z-30 w-20 object-contain sm:w-24"
                />

                <motion.img
                  src={Phone}
                  alt="Phone"
                  className="absolute bottom-[18%] right-[3%] z-30 w-20 object-contain sm:w-24"
                />

                <motion.img
                  src={Watch}
                  alt="Watch"
                  className="absolute bottom-[10%] left-[10%] z-30 w-20 object-contain sm:w-24"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {user && (products.length > 0 || recommendation || comparison) && (
        <main
          ref={resultsRef}
          className="scroll-mt-20 bg-gradient-to-br from-[#fffaf3] via-[#fff1fa] to-[#eef3ff] px-4 py-12"
        >
          <div className="mx-auto max-w-7xl">
            {recommendation && (
              <section className="mb-12">
                <RecommendationCard
                  recommendation={recommendation}
                  products={products}
                />
              </section>
            )}

            {products.length > 0 && (
              <section className="mb-12">
                <div className="mb-6">
                  <h2 className="mt-3 text-3xl font-extralight text-gray-900">
                    Recommended Products
                  </h2>

                  <p className="mt-2 font-extralight text-gray-500">
                    Real products found according to your conversation.
                  </p>
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

            {comparison && (
              <section className="mb-12">
                <div className="mb-6">
                  <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-extralight text-indigo-700">
                    AI POWERED
                  </span>

                  <h2 className="mt-3 text-3xl font-extralight text-gray-900">
                    AI Comparison
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Compare products and make a smarter buying decision.
                  </p>
                </div>

                {renderComparison()}
              </section>
            )}
          </div>
        </main>
      )}

      {user && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
}
