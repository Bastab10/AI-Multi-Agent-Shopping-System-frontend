import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { compareProducts as compareAI } from "../services/comparisonApi";
import { Scale, Trash2, Bot } from "lucide-react";

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
      const res = await compareAI(products);
      setResult(res.data.comparison);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar compareCount={products.length} />

      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Scale size={28} />
              Compare Products
            </h1>

            <div className="flex gap-3">
              <button onClick={clearAll} className="border px-4 py-2 rounded-lg">
                Clear
              </button>

              <button
                onClick={handleCompare}
                disabled={loading}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Comparing..." : "AI Compare"}
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow">
              <Scale className="mx-auto mb-4 text-gray-400" size={50} />
              <h2 className="text-xl font-semibold">No products selected</h2>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Seller</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="p-4 flex items-center gap-3">
                          <img src={p.image} alt={p.title} className="w-16 h-16 rounded object-cover"/>
                          <span>{p.title}</span>
                        </td>

                        <td className="p-4 font-semibold">₹{p.price}</td>
                        <td className="p-4">{p.rating || "-"}</td>
                        <td className="p-4">{p.source || "-"}</td>

                        <td className="p-4">
                          <button
                            onClick={() => removeProduct(p.id)}
                            className="text-red-600 flex items-center gap-1"
                          >
                            <Trash2 size={16}/> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {result && (
                <div className="bg-white rounded-xl shadow p-6 mt-8">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <Bot size={22}/> AI Result
                  </h2>

                  <p><strong>Winner:</strong> {result.winner}</p>
                  <p><strong>Best Value:</strong> {result.bestValue}</p>

                  <div className="mt-4">
                    <h3 className="font-semibold">Summary</h3>
                    <p className="text-gray-600 mt-2">{result.summary}</p>
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
