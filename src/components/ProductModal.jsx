import "../styles/ProductModal.css";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <div className="modal-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="modal-content">
          <h2>{product.title}</h2>

          <p className="price">💰 {product.price}</p>

          <p>⭐ Rating: {product.rating}</p>

          <p>📝 Reviews: {product.reviews}</p>

          <p>🏪 Seller: {product.source}</p>

          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
          >
            <button className="buy-btn">
              Buy Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;