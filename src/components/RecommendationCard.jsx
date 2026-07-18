import { Award, DollarSign, Sparkles, Bot } from "lucide-react";

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
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
          AI Recommendations
        </h2>

        <p className="mt-2 text-gray-500 text-base">
          Personalized picks selected by AI based on price, value and quality.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-semibold ${card.color}`}
            >
              <card.icon className="w-4 h-4" />
              {card.title}
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              {card.data?.title || "N/A"}
            </h3>

            <p className="text-gray-500 mt-1">{card.subtitle}</p>

            <p className="text-3xl font-bold text-blue-600 mt-4">
              ₹{card.data?.price || "N/A"}
            </p>

            <p className="text-gray-600 mt-4">
              {card.data?.explanation || "No explanation available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationCard;
