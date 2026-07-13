import "../styles/WishlistButton.css";

function WishlistButton({
  isWishlisted,
  onToggle,
}) {
  return (
    <button
      className={`wishlist-btn ${
        isWishlisted ? "active" : ""
      }`}
      onClick={onToggle}
    >
      {isWishlisted ? "❤️" : "🤍"}
    </button>
  );
}

export default WishlistButton;