function RecommendationCard({ recommendation }) {

    if (!recommendation) return null;

    return (

        <div>

            <h2>🤖 AI Recommendation</h2>

            <div>

                <h3>🏆 Best Overall</h3>

                <p>
                    {recommendation.best_overall.title}
                </p>

                <p>
                    {recommendation.best_overall.price}
                </p>

                <p>
                    {recommendation.best_overall.explanation}
                </p>

            </div>

            <hr/>

            <div>

                <h3>💰 Best Budget</h3>

                <p>
                    {recommendation.best_budget.title}
                </p>

                <p>
                    {recommendation.best_budget.price}
                </p>

                <p>
                    {recommendation.best_budget.explanation}
                </p>

            </div>

            <hr/>

            <div>

                <h3>⭐ Premium Choice</h3>

                <p>
                    {recommendation.premium_choice.title}
                </p>

                <p>
                    {recommendation.premium_choice.price}
                </p>

                <p>
                    {recommendation.premium_choice.explanation}
                </p>

            </div>

        </div>

    );

}

export default RecommendationCard;