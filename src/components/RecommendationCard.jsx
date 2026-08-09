import {
  Award,
  DollarSign,
  Sparkles,
  ExternalLink,
  ShoppingCart,
} from "lucide-react";

function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;

  const cards = [
    {
      icon: Award,
      title: "Best Overall",
      subtitle: "Top Pick",
      color: "bg-purple-600",
      data: recommendation.best_overall,
    },
    {
      icon: DollarSign,
      title: "Best Budget",
      subtitle: "Value for Money",
      color: "bg-green-600",
      data: recommendation.best_budget,
    },
    {
      icon: Sparkles,
      title: "Premium Choice",
      subtitle: "High-End",
      color: "bg-orange-500",
      data: recommendation.premium_choice,
    },
  ];

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl bg-blue-50
            border border-blue-100 flex items-center justify-center"
          >
            <Sparkles className="w-[18px] h-[18px] text-blue-600" />
          </div>

          <div>
            <h2
              className="text-2xl md:text-[27px] font-bold
              tracking-[-0.02em] text-gray-900 leading-tight"
            >
              AI Recommendations
            </h2>
          </div>
        </div>

        <p className="mt-1.5 ml-[47px] text-sm text-gray-500">
          Personalized picks selected by AI based on price, value and quality.
        </p>
      </div>

      {/* Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const product = card.data;

          return (
            <div
              key={index}
              className="group bg-white rounded-xl
              border border-gray-200
              shadow-sm hover:shadow-md
              transition-shadow duration-200
              overflow-hidden"
            >
              <div className="p-4">
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-1.5
                  px-2.5 py-1 rounded-full
                  text-white text-[11px] font-semibold
                  ${card.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {card.title}
                </div>

                {/* Product Title */}
                <h3
                  className="mt-3.5 text-[16px] font-semibold
                  text-gray-900 leading-[1.35]
                  line-clamp-2 min-h-[43px]"
                >
                  {product?.title || "Product not available"}
                </h3>

                {/* Category */}
                <p className="mt-1 text-xs text-gray-400 font-medium">
                  {card.subtitle}
                </p>

                {/* Price */}
                <div className="mt-2.5">
                  <span className="text-[23px] font-bold tracking-tight text-blue-600">
                    {product?.price || "N/A"}
                  </span>
                </div>

                {/* Explanation */}
                <p
                  className="mt-2.5 text-[13px] text-gray-500
                  leading-[1.45] line-clamp-2 min-h-[38px]"
                >
                  {product?.explanation ||
                    "No explanation available for this recommendation."}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  {product?.link ? (
                    <>
                      {/* Buy Now */}
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center
                        gap-1.5 px-4 py-2
                        bg-blue-600 hover:bg-blue-700
                        text-white rounded-lg
                        text-xs font-semibold
                        transition-colors duration-200"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy Now
                      </a>

                      {/* External Link */}
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8
                        border border-gray-200
                        rounded-lg
                        hover:bg-gray-50
                        flex items-center justify-center
                        transition-colors duration-200"
                        title="View Product"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                      </a>
                    </>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center
                      justify-center gap-1.5
                      px-4 py-2
                      bg-gray-100 text-gray-400
                      rounded-lg text-xs font-semibold
                      cursor-not-allowed"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Link Unavailable
                    </button>
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
