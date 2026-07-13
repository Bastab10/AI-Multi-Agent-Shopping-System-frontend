import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  wishlist,
  toggleWishlist,
  onViewProduct,
}) {
  if (products.length === 0) return null;

  return (
    <>
      <h2 style={{ marginTop: "40px" }}>
        🛍️ Products
      </h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onViewProduct={onViewProduct}
          />
        ))}
      </div>
    </>
  );
}

export default ProductGrid;