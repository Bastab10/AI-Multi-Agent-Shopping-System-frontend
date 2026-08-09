import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../services/wishlistApi";

import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const res = await getWishlist();

      setWishlist(res.data.data);
    } catch (err) {
      // Error handling silently
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await removeWishlistItem(id);
      loadWishlist();
    } catch (err) {
      // Error handling silently
    }
  };

  const handleClearWishlist = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your wishlist?",
    );

    if (!confirmClear) return;

    try {
      await clearWishlist();
      loadWishlist();
    } catch (err) {
      // Error handling silently
    }
  };

  return (
    <>
      <Navbar wishlistCount={wishlist.length} />

      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>

              <p className="mt-2 text-gray-500">
                {wishlist.length} Saved Products
              </p>
            </div>

            {!loading && wishlist.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-100 transition"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {/* Loading */}

          {loading && (
            <div className="flex justify-center py-24">
              <p className="text-lg text-gray-500">Loading Wishlist...</p>
            </div>
          )}

          {/* Empty State */}

          {!loading && wishlist.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-16 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                <Heart className="text-red-500" size={34} />
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Wishlist is Empty
              </h2>

              <p className="mt-3 text-gray-500">
                Save your favourite products to see them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className="rounded-[28px] bg-white border border-gray-200 p-5 shadow-sm hover:shadow-xl transition duration-300"
                >
                  {/* Product Image */}

                  <div className="relative rounded-3xl bg-gray-100 h-72 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-56 h-56 object-contain"
                    />

                    {/* Remove */}

                    <button
                      onClick={() => removeProduct(product._id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>

                  {/* Badge */}

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Saved
                    </span>

                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} className="fill-yellow-400" />

                      <span className="text-sm font-medium text-gray-700">
                        {product.rating || "4.8"}
                      </span>
                    </div>
                  </div>

                  {/* Title */}

                  <h3 className="mt-4 line-clamp-2 min-h-[56px] text-xl font-semibold text-gray-900">
                    {product.title}
                  </h3>

                  {/* Price */}

                  <div className="mt-5">
                    <p className="text-sm text-gray-500">Price</p>

                    <p className="text-3xl font-bold text-green-600">
                      ₹{product.price}
                    </p>
                  </div>

                  {/* Buttons */}

                  <div className="mt-6 flex items-center gap-3">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full bg-black py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Buy Now
                    </a>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Wishlist;
