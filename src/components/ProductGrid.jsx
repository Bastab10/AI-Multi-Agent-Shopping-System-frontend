import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  wishlist,
  toggleWishlist,
  onViewProduct,
  compareProducts,
  toggleCompare,
}) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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