import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { compareProducts as compareAI } from "../services/comparisonApi";
import { Scale, Trash2, Bot, Trophy, DollarSign, Check, X, Info, ShoppingCart, ExternalLink } from "lucide-react";

function Compare() {
  const [compareProducts, setCompareProducts] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("compareProducts");

    if (saved) {
      setCompareProducts(JSON.parse(saved));
    }
  }, []);

  // Remove Single Product
  const removeProduct = (id) => {
    const updated = compareProducts.filter(
      (item) => item.id !== id
    );

    setCompareProducts(updated);

    localStorage.setItem(
      "compareProducts",
      JSON.stringify(updated)
    );

    setComparison(null);
  };

  // Clear Compare
  const clearCompare = () => {
    setCompareProducts([]);
    setComparison(null);

    localStorage.removeItem(
      "compareProducts"
    );
  };

  // AI Compare
  const handleCompare = async () => {
    try {
      if (compareProducts.length < 2) {
        alert(
          "Please select at least 2 products."
        );
        return;
      }

      setLoading(true);

      const res = await compareAI(compareProducts);

      setComparison(res.data.comparison);

    } catch (error) {

      console.log(error);

      alert("Comparison Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar compareCount={compareProducts.length} />

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-screen-2xl mx-auto px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Compare Products</h1>
          </div>

          {compareProducts.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Scale className="w-12 h-12 text-text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">No Products Selected</h2>
              <p className="text-text-secondary">Select products from the Home page to compare them.</p>
            </div>
          ) : (
            <>
              {/* Actions */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={clearCompare}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-full hover:bg-gray-50 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5 text-danger" />
                  Clear Compare
                </button>

                <button
                  onClick={handleCompare}
                  disabled={loading}
                  className="btn-primary flex items-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  {loading ? "Comparing..." : "AI Compare"}
                </button>
              </div>

              {/* Comparison Table */}
              <div className="card overflow-hidden mb-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-section sticky top-0">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-text-primary">Feature</th>
                        {compareProducts.map((product) => (
                          <th key={product.id} className="px-6 py-4 text-left font-semibold text-text-primary min-w-[200px]">
                            {product.title}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-text-secondary">Image</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-24 h-24 object-cover rounded-xl"
                            />
                          </td>
                        ))}
                      </tr>

                      <tr className="border-t border-border bg-gray-50">
                        <td className="px-6 py-4 font-medium text-text-secondary">Price</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4">
                            <span className="text-xl font-bold text-primary-600">₹{product.price}</span>
                          </td>
                        ))}
                      </tr>

                      <tr className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-text-secondary">Rating</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4">
                            <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                              ⭐ {product.rating || "N/A"}
                            </span>
                          </td>
                        ))}
                      </tr>

                      <tr className="border-t border-border bg-gray-50">
                        <td className="px-6 py-4 font-medium text-text-secondary">Reviews</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4 text-text-secondary">
                            {product.reviews || 0}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-text-secondary">Seller</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4 text-text-secondary">
                            {product.source || "N/A"}
                          </td>
                        ))}
                      </tr>

                      <tr className="border-t border-border bg-gray-50">
                        <td className="px-6 py-4 font-medium text-text-secondary">Buy</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4">
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary inline-flex items-center gap-2 text-sm py-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Buy Now
                            </a>
                          </td>
                        ))}
                      </tr>

                      <tr className="border-t border-border">
                        <td className="px-6 py-4 font-medium text-text-secondary">Action</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="px-6 py-4">
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="flex items-center gap-2 text-danger hover:text-red-700 font-medium text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI Comparison Result */}
              {comparison && (
                <div className="animate-slide-up">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">AI Comparison Result</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Winner Card */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="w-6 h-6" />
                        <h3 className="text-lg font-bold">Winner</h3>
                      </div>
                      <p className="text-2xl font-black">{comparison.winner}</p>
                    </div>

                    {/* Best Value Card */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-6 h-6" />
                        <h3 className="text-lg font-bold">Best Value</h3>
                      </div>
                      <p className="text-2xl font-black">{comparison.bestValue}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Pros */}
                    <div className="card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Check className="w-5 h-5 text-success" />
                        <h3 className="text-lg font-bold text-text-primary">Pros</h3>
                      </div>
                      <ul className="space-y-2">
                        {comparison.pros?.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2 text-text-secondary">
                            <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <X className="w-5 h-5 text-danger" />
                        <h3 className="text-lg font-bold text-text-primary">Cons</h3>
                      </div>
                      <ul className="space-y-2">
                        {comparison.cons?.map((con, index) => (
                          <li key={index} className="flex items-start gap-2 text-text-secondary">
                            <X className="w-5 h-5 text-danger mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-5 h-5 text-primary-600" />
                      <h3 className="text-lg font-bold text-primary-600">Summary</h3>
                    </div>
                    <p className="text-text-secondary">{comparison.summary}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Compare;