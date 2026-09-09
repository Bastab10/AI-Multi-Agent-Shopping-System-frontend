import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { compareProducts as compareAI } from "../services/comparisonApi";

import {
  Trash2,
  Bot,
  Sparkles,
  Check,
} from "lucide-react";

export default function Compare() {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("compareProducts") || "[]");

    setProducts(saved);
  }, []);

  const removeProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);

    setProducts(updated);

    localStorage.setItem("compareProducts", JSON.stringify(updated));

    setResult(null);
  };

  const clearAll = () => {
    setProducts([]);

    localStorage.removeItem("compareProducts");

    setResult(null);
  };

  const handleCompare = async () => {
    if (products.length < 2) {
      alert("Select at least 2 products");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await compareAI(products);

      setResult(res.data.comparison);
    } catch (error) {
      console.error("Comparison failed:", error);
      alert("Unable to compare products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar compareCount={products.length} />

      <main className="min-h-screen bg-[#f6f7f9] py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Compare Products
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Compare prices, ratings and sellers to find the right product.
              </p>
            </div>

            {products.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAll}
                  className="
                    h-9
                    px-3.5
                    rounded-lg
                    border border-gray-200
                    bg-white
                    text-xs
                    font-medium
                    text-gray-600
                    flex items-center gap-1.5
                  "
                >
                  <Trash2 size={14} />
                  Clear
                </button>

                <button
                  onClick={handleCompare}
                  disabled={loading || products.length < 2}
                  className="
                    h-9
                    px-4
                    rounded-lg
                    bg-gray-900
                    text-white
                    text-xs
                    font-semibold
                    flex items-center gap-1.5
                    disabled:bg-gray-300
                    disabled:cursor-not-allowed
                  "
                >
                  {loading ? (
                    <>
                      <Bot size={14} className="animate-pulse" />
                      Comparing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      AI Compare
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {products.length === 0 ? (
            <div
              className="
                min-h-[400px]
                bg-white
                border border-gray-200
                rounded-2xl
                flex
                items-center
                justify-center
                text-center
                px-6
              "
            >
              <div className="max-w-sm">
                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  No products selected
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Add products to compare their prices, ratings, sellers and
                  AI-powered insights.
                </p>

              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500">
                  {products.length}{" "}
                  {products.length === 1
                    ? "product selected"
                    : "products selected"}
                </p>

                {products.length < 2 && (
                  <p className="text-xs text-orange-500">
                    Select at least 2 products to compare
                  </p>
                )}
              </div>

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-gray-200
                  bg-white
                "
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/70">
                        <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Product
                        </th>

                        <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Price
                        </th>

                        <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Rating
                        </th>

                        <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Seller
                        </th>

                        <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="
                                  w-14 h-14
                                  shrink-0
                                  rounded-xl
                                  bg-gray-50
                                  flex items-center justify-center
                                  overflow-hidden
                                "
                              >
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="
                                    w-full
                                    h-full
                                    object-contain
                                    p-2
                                    mix-blend-multiply
                                  "
                                />
                              </div>
                              
                              <div className="min-w-0">
                                <p
                                  className="
                                    max-w-[300px]
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                    line-clamp-2
                                  "
                                >
                                  {product.title}
                                </p>

                                <span className="text-[10px] text-gray-400">
                                  Product selected for comparison
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="text-base font-bold text-gray-900">
                              {product.price}
                            </span>
                          </td>

                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          
                          <td className="px-4 py-4">
                            <div className="inline-flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-gray-800">
                                {product.rating || "-"}
                              </span>

                              {product.rating && (
                                <span className="text-yellow-500 text-sm">
                                  ★
                                </span>
                              )}
                            </div>
                          </td>

                          
                          
                          
                          
                          
                          
                          
                          <td className="px-4 py-4">
                            <span
                              className="
                                inline-flex
                                px-2.5 py-1
                                rounded-full
                                bg-gray-50
                                border border-gray-100
                                text-[11px]
                                font-medium
                                text-gray-600
                              "
                            >
                              {product.source || "Unknown"}
                            </span>
                          </td>

                          
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="
                                inline-flex
                                items-center
                                gap-1
                                text-xs
                                font-medium
                                text-gray-400
                                hover:text-red-500
                              "
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {loading && (
                <div
                  className="
                    mt-5
                    rounded-2xl
                    border border-indigo-100
                    bg-white
                    p-6
                    flex items-center gap-4
                  "
                >
                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-indigo-50
                      text-indigo-600
                      flex items-center justify-center
                    "
                  >
                    <Bot size={19} className="animate-pulse" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      AI is comparing your products
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Analyzing price, value, ratings and overall quality...
                    </p>
                  </div>
                </div>
              )}

              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              
              {result && !loading && (
                <div className="mt-6">
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        AI Comparison
                      </h2>

                      <p className="text-xs text-gray-500 mt-0.5">
                        AI-powered analysis of your selected products
                      </p>
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div
                      className="
                        rounded-2xl
                        border border-gray-200
                        bg-white
                        p-5
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500">
                          AI Winner
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-gray-900">
                        {result.winner || "Not available"}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                        <Check size={14} />
                        Recommended choice
                      </div>
                    </div>

                    
                    <div
                      className="
                        rounded-2xl
                        border border-gray-200
                        bg-white
                        p-5
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-500">
                          Best Value
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-gray-900">
                        {result.bestValue || "Not available"}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-xs text-blue-600">
                        <Check size={14} />
                        Strong price-to-value choice
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
