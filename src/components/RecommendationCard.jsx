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
      data: recommendation.best_overall,
      explanation:
        "Highest rated product with strong customer reviews.",
    },
    {
      icon: DollarSign,
      title: "Best Budget",
      subtitle: "Value for Money",
      data: recommendation.best_budget,
      explanation:
        "Lowest priced product among the available results.",
    },
    {
      icon: Sparkles,
      title: "Premium Choice",
      subtitle: "High-End",
      data: recommendation.premium_choice,
      explanation:
        "Most premium and highest priced product in the results.",
    },
  ];

  const findOriginalProduct = (recommendedProduct) => {
    if (!recommendedProduct || !products?.length) {
      return null;
    }

    const recommendedTitle =
      recommendedProduct.title?.toLowerCase()?.trim();

    if (!recommendedTitle) return null;

    const exactMatch = products.find(
      (product) =>
        product.title?.toLowerCase()?.trim() ===
        recommendedTitle
    );

    if (exactMatch) return exactMatch;

    const partialMatch = products.find((product) => {
      const title = product.title?.toLowerCase()?.trim();

      if (!title) return false;

      return (
        title.includes(recommendedTitle) ||
        recommendedTitle.includes(title)
      );
    });

    return partialMatch || null;
  };

  return (
    <section className="w-full">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="min-w-0">
            <h2
              className="
                text-2xl
                sm:text-xl
                font-bold
                tracking-tight
                text-gray-900
                leading-tight
                font-extralight
              "
            >
              AI Recommendations
            </h2>

            <p
              className="
                mt-1.5
                text-sm
                sm:text-[11px]
                leading-5
                text-gray-500
                max-w-xl
                font-extralight
              "
            >
              Personalized picks selected by AI based on price,
              value and quality.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="
            mt-4
            w-full
            sm:w-auto
            sm:float-right
            sm:-mt-10
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-full
            border
            border-white/70
            bg-white/35
            text-sm
            sm:text-[11px]
            font-semibold
            text-blue-600
            hover:bg-white/55
            transition
          "
        >
          View all recommendations
          <ExternalLink size={14} />
        </button>

        <div className="clear-both" />
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        "
      >
        {cards.map((card, index) => {
          const product = card.data;

          if (!product) return null;

          const originalProduct =
            findOriginalProduct(product);

          const productImage =
            originalProduct?.image ||
            product?.image ||
            product?.thumbnail ||
            product?.imageUrl ||
            null;

          const productLink =
            product?.link ||
            originalProduct?.link ||
            null;

          const rating =
            originalProduct?.rating ||
            product?.rating ||
            "4.8";

          const reviews =
            originalProduct?.reviews ||
            product?.reviews ||
            0;

          return (
            <article
              key={index}
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border border-white/70
                bg-gradient-to-br
                from-white/45
                via-purple-50/30
                to-pink-50/35
                backdrop-blur-xl
              "
            >
              <div className="p-4 sm:p-4">
                <div className="mb-4">
                  <h3
                    className="
                      text-sm
                      sm:text-[13px]
                      font-bold
                      text-gray-900
                    "
                  >
                    {card.title}
                  </h3>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      w-[112px]
                      h-[112px]
                      sm:w-[82px]
                      sm:h-[92px]
                      shrink-0
                      rounded-xl
                      bg-white/25
                      border border-white/50
                      flex
                      items-center
                      justify-center
                      overflow-hidden
                    "
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={
                          product.title || "Product"
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
                      <div
                        className="
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                          px-2
                        "
                      >
                        <ShoppingCart
                          size={20}
                          className="text-gray-300"
                        />

                        <span
                          className="
                            mt-1
                            text-[9px]
                            text-gray-400
                          "
                        >
                          Image unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                        text-base
                        sm:text-[13px]
                        font-bold
                        text-gray-900
                        leading-[1.3]
                        line-clamp-2
                      "
                    >
                      {product.title ||
                        "Product not available"}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        sm:text-[10px]
                        text-gray-400
                      "
                    >
                      {card.subtitle}
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        sm:text-[18px]
                        font-bold
                        tracking-tight
                        text-slate-900
                      "
                    >
                      {product.price || "N/A"}
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        mt-1
                      "
                    >
                      <Star
                        size={15}
                        className="text-yellow-500"
                        fill="currentColor"
                      />

                      <span
                        className="
                          text-sm
                          sm:text-[10px]
                          font-semibold
                          text-gray-700
                        "
                      >
                        {rating}
                      </span>

                      {reviews > 0 && (
                        <span
                          className="
                            text-xs
                            sm:text-[9px]
                            text-gray-400
                          "
                        >
                          ({reviews})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    sm:text-[10px]
                    leading-5
                    sm:leading-4
                    text-gray-400
                    line-clamp-2
                    sm:line-clamp-1
                  "
                >
                  {product.explanation ||
                    card.explanation}
                </p>

                <div
                  className="
                    flex
                    items-center
                    justify-end
                    gap-3
                    mt-4
                    pt-3
                    border-t
                    border-white/60
                  "
                >
                  {productLink ? (
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        h-10
                        sm:h-8
                        px-5
                        sm:px-3
                        rounded-full
                        bg-slate-900
                        text-white
                        text-sm
                        sm:text-[10px]
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        whitespace-nowrap
                        active:scale-95
                        hover:bg-slate-800
                        transition-all
                      "
                    >
                      <ShoppingCart
                        size={15}
                        className="sm:w-[11px] sm:h-[11px]"
                      />

                      Buy Now
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="
                        h-10
                        sm:h-8
                        px-5
                        sm:px-3
                        rounded-full
                        bg-gray-100
                        text-gray-400
                        text-sm
                        sm:text-[10px]
                        font-semibold
                      "
                    >
                      Link Unavailable
                    </button>
                  )}

                  {productLink && (
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Product"
                      className="
                        w-10
                        h-10
                        sm:w-8
                        sm:h-8
                        shrink-0
                        rounded-full
                        border border-white/70
                        bg-white/30
                        flex
                        items-center
                        justify-center
                        active:scale-95
                        hover:bg-white/50
                        transition-all
                      "
                    >
                      <ExternalLink
                        size={16}
                        className="
                          text-gray-600
                          sm:w-[12px]
                          sm:h-[12px]
                        "
                      />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RecommendationCard;