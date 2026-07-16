import { Heart, GitCompare, Star, ShoppingCart, ExternalLink } from "lucide-react";

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  onViewProduct,
  compareProducts,
  toggleCompare,
}) {
  const isWishlisted = wishlist.some(
    (item) => item.productId === product.id
  );
  const isCompared = compareProducts.some((item) => item.id === product.id);

  return (
    <div 
      className="card p-5 cursor-pointer group animate-fade-in"
      onClick={() => onViewProduct(product)}
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-300 z-10"
      >
        <Heart 
          className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
        />
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
        <span className="text-text-secondary text-sm">({product.reviews || 0} reviews)</span>
      </div>

      <p className="text-2xl font-black text-primary-600 mb-4">
        ₹{product.price}
      </p>

      {/* Compare Checkbox */}
      <label 
        className="flex items-center gap-2 cursor-pointer mb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={isCompared}
          onChange={() => toggleCompare(product)}
          className="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm font-medium text-text-secondary">Add to Compare</span>
      </label>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <a
          href={product.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2.5"
        >
          <ShoppingCart className="w-4 h-4" />
          Buy Now
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProduct(product);
          }}
          className="btn-secondary flex items-center justify-center gap-2 text-sm py-2.5"
        >
          <ExternalLink className="w-4 h-4" />
          Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
