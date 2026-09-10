import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../services/wishlistApi";

import {
  Heart,
  Trash2,
  Star,
  ArrowUpRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setWishlistCount } = useAuth();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const res = await getWishlist();

      setWishlist(res.data.data || []);
      setWishlistCount(res.data.data?.length || 0);
    } catch (err) {
      console.error("Wishlist loading error:", err);
      setWishlist([]);
      setWishlistCount(0);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await removeWishlistItem(id);
      await loadWishlist();
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  const handleClearWishlist = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your wishlist?"
    );

    if (!confirmClear) return;

    try {
      await clearWishlist();
      await loadWishlist();
    } catch (err) {
      console.error("Clear wishlist error:", err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f6f8] py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <div className="flex items-center gap-2">
                <Heart
                  size={18}
                  className="text-red-500"
                  fill="currentColor"
                />

                <h1 className="text-2xl font-bold text-gray-900">
                  My Wishlist
                </h1>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "product" : "products"} saved
              </p>
            </div>

            {!loading && wishlist.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="
                  h-9
                  px-3.5
                  rounded-lg
                  bg-white
                  border border-gray-200
                  text-xs
                  font-medium
                  text-gray-600
                  flex items-center gap-1.5
                "
              >
                <Trash2 size={14} />
                Clear
              </button>
            )}
          </div>

          
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-32
                    rounded-2xl
                    bg-white
                    border border-gray-200
                    animate-pulse
                  "
                />
              ))}
            </div>
          )}

          {!loading && wishlist.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border border-gray-200
                    bg-white
                    p-3
                  "
                >
                  <div
                    className="
                      relative
                      w-28
                      h-28
                      shrink-0
                      rounded-xl
                      bg-[#f5f6f7]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                        w-24
                        h-24
                        object-contain
                      "
                    />

                    <button
                      onClick={() =>
                        removeProduct(product._id)
                      }
                      title="Remove from wishlist"
                      className="
                        absolute
                        -top-1.5
                        -right-1.5
                        w-7
                        h-7
                        rounded-full
                        bg-white
                        border border-gray-200
                        flex
                        items-center
                        justify-center
                        text-gray-500
                      "
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="min-w-0 flex-1">

                    <h2
                      className="
                        text-[15px]
                        leading-5
                        font-semibold
                        text-gray-900
                        line-clamp-2
                      "
                    >
                      {product.title}
                    </h2>

                    <div className="mt-1.5 flex items-center gap-1">
                      <Star
                        size={13}
                        className="text-yellow-500"
                        fill="currentColor"
                      />

                      <span className="text-xs font-medium text-gray-600">
                        {product.rating || "4.8"}
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {product.price}
                    </p>

                    <div className="mt-1 flex items-center gap-1">
                      <Heart
                        size={11}
                        className="text-red-500"
                        fill="currentColor"
                      />

                      <span className="text-[11px] text-gray-400">
                        Saved to wishlist
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        h-9
                        px-3.5
                        rounded-lg
                        bg-gray-900
                        text-white
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-1.5
                      "
                    >
                      View
                      <ArrowUpRight size={13} />
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