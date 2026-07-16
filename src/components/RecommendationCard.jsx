import { Award, DollarSign, Sparkles, Bot } from "lucide-react";

function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;

  const cards = [
    {
      icon: Award,
      title: "Best Overall",
      subtitle: "Top Pick",
      gradient: "from-purple-500 to-purple-600",
      data: recommendation.best_overall,
    },
    {
      icon: DollarSign,
      title: "Best Budget",
      subtitle: "Value for Money",
      gradient: "from-green-500 to-green-600",
      data: recommendation.best_budget,
    },
    {
      icon: Sparkles,
      title: "Premium Choice",
      subtitle: "High-End",
      gradient: "from-orange-500 to-orange-600",
      data: recommendation.premium_choice,
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">AI Recommendations</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="card p-6 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${card.gradient} text-white rounded-full text-sm font-semibold mb-4`}>
              <card.icon className="w-4 h-4" />
              {card.title}
            </div>

            <h3 className="font-bold text-text-primary text-lg mb-1">
              {card.data?.title || "N/A"}
            </h3>

            <p className="text-sm text-text-secondary mb-2">{card.subtitle}</p>

            <p className="text-2xl font-black text-primary-600 mb-3">
              ₹{card.data?.price || "N/A"}
            </p>

            <p className="text-sm text-text-secondary line-clamp-3">
              {card.data?.explanation || "No explanation available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationCard;