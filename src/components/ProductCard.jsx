import { Heart, Star, ShoppingCart, ExternalLink } from "lucide-react";

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  onViewProduct,
  compareProducts,
  toggleCompare,
}) {
  const isWishlisted = wishlist.some((item) => item.productId === product.id);
  const isCompared = compareProducts.some((item) => item.id === product.id);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={() => onViewProduct(product)}
    >
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        <div className="h-72 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-14">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mt-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating || "N/A"}</span>
          <span className="text-sm text-gray-500">
            ({product.reviews || 0} reviews)
          </span>
        </div>

        <p className="text-2xl font-bold text-blue-600 mt-3">
          ₹{product.price}
        </p>

        <label
          className="flex items-center gap-2 text-sm text-gray-600 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => toggleCompare(product)}
          />
          Add to Compare
        </label>

        <div className="flex gap-3 mt-5">
          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="px-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
