import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../services/wishlistApi";
import { Heart, Trash2, ShoppingCart, ExternalLink, Star } from "lucide-react";

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    try {
      await removeWishlistItem(id);

      loadWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // Clear Wishlist
  const handleClearWishlist = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your wishlist?"
    );

    if (!confirmClear) return;

    try {
      await clearWishlist();

      loadWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar wishlistCount={wishlist.length} />

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-screen-2xl mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-text-primary">My Wishlist</h1>
            </div>

            {!loading && wishlist.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-full hover:bg-gray-50 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5 text-danger" />
                Clear Wishlist
              </button>
            )}
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-primary-600">
                <Heart className="w-5 h-5 animate-pulse" />
                <span className="font-semibold">Loading Wishlist...</span>
              </div>
            </div>
          )}

          {!loading && wishlist.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Your Wishlist is Empty</h2>
              <p className="text-text-secondary">Search products and add them to your wishlist.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className="card p-5 relative group animate-fade-in"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 z-10"
                  >
                    <Trash2 className="w-5 h-5 text-danger" />
                  </button>

                  {/* Product Image */}
                  <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100 aspect-square">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <h3 className="font-bold text-text-primary text-lg mb-2 line-clamp-2 h-14">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-sm">{product.rating || "N/A"}</span>
                    </div>
                  </div>

                  <p className="text-2xl font-black text-primary-600 mb-4">
                    ₹{product.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now
                    </a>
                    <button className="btn-secondary flex items-center justify-center gap-2 text-sm py-2.5">
                      <ExternalLink className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;