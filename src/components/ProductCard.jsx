import {
  Heart,
  Star,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

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

  const isCompared = compareProducts.some(
    (item) => item.id === product.id
  );

  return (
    <div
      className="
        relative
        bg-white
        rounded-xl
        border border-gray-200
        shadow-sm
        overflow-hidden
        cursor-pointer
      "
      onClick={() => onViewProduct(product)}
    >
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="
          absolute top-3 right-3 z-10
          w-8 h-8
          rounded-full
          bg-white
          border border-gray-200
          shadow-sm
          flex items-center justify-center
          hover:bg-gray-50
          transition
        "
      >
        <Heart
          className={`w-4 h-4 ${
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }`}
        />
      </button>

      
      <div
        className="
          h-56
          flex items-center justify-center
          p-5
          overflow-hidden
        "
      >
        <img
          src={product.image}
          alt={product.title}
          className="
            max-h-full
            max-w-full
            object-contain
            mix-blend-multiply
          "
        />
      </div>

      
      <div className="p-4">

        
        <h3
          className="
            text-[15px]
            font-semibold
            text-gray-900
            leading-5
            line-clamp-2
            min-h-[40px]
          "
        >
          {product.title}
        </h3>

        
        <div className="flex items-center gap-1.5 mt-2.5">
          <Star
            className="
              w-3.5 h-3.5
              fill-yellow-400
              text-yellow-400
            "
          />

          <span className="text-xs font-semibold text-gray-800">
            {product.rating || "N/A"}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviews || 0})
          </span>
        </div>

        
        <p
          className="
            text-xl
            font-bold
            text-slate-900
            mt-2
          "
        >
          {product.price}
        </p>

        
        <label
          className="
            flex items-center gap-2
            text-xs text-gray-500
            mt-3
            cursor-pointer
          "
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => toggleCompare(product)}
            className="
              w-3.5 h-3.5
              accent-blue-600
              cursor-pointer
            "
          />

          <span>Add to Compare</span>
        </label>

        
        <div className="flex gap-2 mt-3">

          
          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              w-36
              h-9
              bg-slate-900
              hover:bg-slate-800
              text-white
              rounded-full
              text-xs
              font-bold
              flex items-center
              justify-center
              gap-1.5
              transition-all duration-200
            "
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Buy Now
          </a>

          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="
              w-9 h-9
              border border-gray-300
              bg-white
              rounded-full
              hover:bg-gray-50
              hover:border-gray-400
              transition-all
              flex items-center
              justify-center
            "
          >
            <ExternalLink
              className="w-3.5 h-3.5 text-gray-600"
            />
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;