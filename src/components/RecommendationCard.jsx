import {
  Award,
  DollarSign,
  Sparkles,
  ExternalLink,
  ShoppingCart,
  Star,
} from "lucide-react";

function RecommendationCard({
  recommendation,
  products = [],
}) {
  if (!recommendation) return null;

  const cards = [
    {
      icon: Award,
      title: "Best Overall",
      subtitle: "Top Pick",
      color: "bg-slate-900",
      data: recommendation.best_overall,
    },
    {
      icon: DollarSign,
      title: "Best Budget",
      subtitle: "Value for Money",
      color: "bg-blue-600",
      data: recommendation.best_budget,
    },
    {
      icon: Sparkles,
      title: "Premium Choice",
      subtitle: "High-End",
      color: "bg-slate-700",
      data: recommendation.premium_choice,
    },
  ];

  // Find original product from search results
  const findOriginalProduct = (recommendedProduct) => {
    if (!recommendedProduct || !products?.length) {
      return null;
    }

    const recommendedTitle =
      recommendedProduct.title?.toLowerCase()?.trim();

    if (!recommendedTitle) {
      return null;
    }

    // Exact title match
    const exactMatch = products.find(
      (product) =>
        product.title?.toLowerCase()?.trim() ===
        recommendedTitle
    );

    if (exactMatch) {
      return exactMatch;
    }

    // Partial title match
    const partialMatch = products.find((product) => {
      const title = product.title?.toLowerCase()?.trim();

      return (
        title?.includes(recommendedTitle) ||
        recommendedTitle?.includes(title)
      );
    });

    return partialMatch || null;
  };

  return (
    <section className="w-full">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">

          <div
            className="
              w-9 h-9
              rounded-full
              bg-indigo-50
              text-indigo-600
              flex items-center justify-center
              shrink-0
            "
          >
            <Sparkles size={16} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              AI Recommendations
            </h2>

            <p className="mt-1 text-[11px] text-gray-500">
              Personalized picks selected by AI based on price,
              value and quality.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="
            hidden sm:flex
            items-center gap-1
            px-3 py-1.5
            rounded-full
            border border-gray-200
            bg-white
            text-[10px]
            font-semibold
            text-blue-600
          "
        >
          View all recommendations
          <ExternalLink size={11} />
        </button>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {cards.map((card, index) => {
          const Icon = card.icon;
          const product = card.data;

          if (!product) return null;

          // Original product from search results
          const originalProduct =
            findOriginalProduct(product);

          // Actual image from original search result
          const productImage =
            originalProduct?.image ||
            product?.image ||
            product?.thumbnail ||
            product?.imageUrl ||
            null;

          // Use original link if AI recommendation
          // does not contain one
          const productLink =
            product?.link ||
            originalProduct?.link ||
            null;

          // Use original rating/reviews if available
          const rating =
            originalProduct?.rating ||
            product?.rating ||
            "4.8";

          const reviews =
            originalProduct?.reviews ||
            product?.reviews ||
            0;

          return (
            <div
              key={index}
              className="
                w-full
                bg-white
                rounded-xl
                border border-gray-200
                overflow-hidden
              "
            >
              <div className="p-3">

                {/* ================= BADGE ================= */}
                <div
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    px-2
                    py-1
                    rounded-full
                    text-white
                    text-[9px]
                    font-semibold
                    ${card.color}
                  `}
                >
                  <Icon size={10} />
                  {card.title}
                </div>

                {/* ================= PRODUCT ================= */}
                <div className="flex gap-3 mt-3">

                  {/* ================= IMAGE ================= */}
                  <div
                    className="
                      w-[82px]
                      h-[92px]
                      shrink-0
                      rounded-lg
                      bg-gray-50
                      flex items-center justify-center
                      overflow-hidden
                    "
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={
                          product.title ||
                          "Product"
                        }
                        className="
                          w-full
                          h-full
                          object-contain
                          p-2
                          mix-blend-multiply
                        "
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center px-2">
                        <ShoppingCart
                          size={18}
                          className="text-gray-300"
                        />

                        <span className="mt-1 text-[8px] text-gray-400">
                          Image unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ================= DETAILS ================= */}
                  <div className="min-w-0 flex-1">

                    {/* Title */}
                    <h3
                      className="
                        text-[13px]
                        font-semibold
                        text-gray-900
                        leading-[17px]
                        line-clamp-2
                      "
                    >
                      {product.title ||
                        "Product not available"}
                    </h3>

                    {/* Subtitle */}
                    <p className="mt-1 text-[10px] text-gray-400">
                      {card.subtitle}
                    </p>

                    {/* Price */}
                    <p
                      className="
                        mt-1.5
                        text-[18px]
                        font-bold
                        tracking-tight
                        text-slate-900
                      "
                    >
                      {product.price || "N/A"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">

                      <Star
                        size={11}
                        className="text-yellow-500"
                        fill="currentColor"
                      />

                      <span className="text-[10px] font-semibold text-gray-700">
                        {rating}
                      </span>

                      {reviews > 0 && (
                        <span className="text-[9px] text-gray-400">
                          ({reviews})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ================= EXPLANATION ================= */}
                <p
                  className="
                    mt-2
                    text-[10px]
                    leading-4
                    text-gray-400
                    line-clamp-1
                  "
                >
                  {product.explanation ||
                    "Recommended based on price, value and quality."}
                </p>

                {/* ================= ACTIONS ================= */}
                <div className="flex items-center gap-2 mt-3">

                  {/* BUY NOW */}
                  {productLink ? (
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        h-8
                        px-3
                        bg-slate-900
                        text-white
                        rounded-full
                        text-[10px]
                        font-bold
                        flex items-center
                        justify-center
                        gap-1.5
                      "
                    >
                      <ShoppingCart size={11} />
                      Buy Now
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="
                        h-8
                        px-3
                        bg-gray-100
                        text-gray-400
                        rounded-full
                        text-[10px]
                        font-semibold
                      "
                    >
                      Link Unavailable
                    </button>
                  )}

                  {/* EXTERNAL LINK */}
                  {productLink && (
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Product"
                      className="
                        w-8
                        h-8
                        rounded-full
                        border border-gray-300
                        bg-white
                        flex items-center
                        justify-center
                      "
                    >
                      <ExternalLink
                        size={12}
                        className="text-gray-600"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecommendationCard;