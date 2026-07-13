import WishlistButton from "./WishlistButton";
import "../styles/ProductCard.css";

function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  onViewProduct,
}) {
  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div
      className="product-card"
      onClick={() => onViewProduct(product)}
    >
      <WishlistButton
        isWishlisted={isWishlisted}
        onToggle={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
      />

      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <h3>{product.title}</h3>

      <p>💰 {product.price}</p>

      <p>⭐ {product.rating}</p>

      <p>📝 {product.reviews} Reviews</p>

      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="buy-btn">
          Buy Now
        </button>
      </a>
    </div>
  );
}

export default ProductCard;