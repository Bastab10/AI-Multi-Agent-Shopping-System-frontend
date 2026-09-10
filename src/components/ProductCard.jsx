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
        overflow-hidden
        cursor-pointer
        rounded-xl
        border border-white/80
        bg-gradient-to-br
        from-pink-50/80
        via-purple-100/55
        to-purple-50/70
        backdrop-blur-xl
        shadow-[0_2px_12px_rgba(100,80,180,0.08)]
        transition-all
        duration-200
        hover:border-white
        hover:shadow-[0_3px_16px_rgba(100,80,180,0.11)]
        font-extralight
      "
      onClick={() => onViewProduct(product)}
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="
          absolute
          top-3
          right-3
          z-10
          w-8
          h-8
          rounded-full
          bg-white/40
          border border-white/80
          flex
          items-center
          justify-center
          hover:bg-white/60
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

      {/* Product Image */}
      <div
        className="
          h-56
          flex
          items-center
          justify-center
          p-5
          overflow-hidden
          bg-white/20
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

      {/* Product Details */}
      <div className="p-4">
        {/* Product Title */}
        <h3
          className="
            text-[15px]
            font-extralight
            text-gray-900
            leading-5
            line-clamp-2
            min-h-[40px]
          "
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div
          className="
            flex
            items-center
            gap-1.5
            mt-2.5
          "
        >
          <Star
            className="
              w-3.5
              h-3.5
              fill-yellow-400
              text-yellow-400
            "
          />

          <span
            className="
              text-xs
              font-extralight
              text-gray-800
            "
          >
            {product.rating || "N/A"}
          </span>

          <span
            className="
              text-xs
              font-extralight
              text-gray-400
            "
          >
            ({product.reviews || 0})
          </span>
        </div>

        {/* Price */}
        <p
          className="
            text-xl
            font-extralight
            text-slate-900
            mt-2
          "
        >
          {product.price}
        </p>

        {/* Compare */}
        <label
          className="
            flex
            items-center
            gap-2
            text-xs
            font-extralight
            text-gray-500
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
              w-3.5
              h-3.5
              accent-blue-600
              cursor-pointer
            "
          />

          <span className="font-extralight">
            Add to Compare
          </span>
        </label>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          {/* Buy Now - DARK SAME */}
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
              font-extralight
              flex
              items-center
              justify-center
              gap-1.5
              transition-all
              duration-200
            "
          >
            <ShoppingCart className="w-3.5 h-3.5" />

            Buy Now
          </a>

          {/* View Product */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="
              w-9
              h-9
              border border-white/80
              bg-white/35
              rounded-full
              hover:bg-white/55
              hover:border-white
              transition-all
              flex
              items-center
              justify-center
            "
          >
            <ExternalLink
              className="
                w-3.5
                h-3.5
                text-gray-600
              "
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;