import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  wishlist,
  toggleWishlist,
  onViewProduct,
  compareProducts,
  toggleCompare,
}) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onViewProduct={onViewProduct}
          compareProducts={compareProducts}
          toggleCompare={toggleCompare}
        />
      ))}
    </div>
  );
}

export default ProductGrid;