import {
  X,
  Star,
  ShoppingCart,
  ExternalLink,
  Store,
} from "lucide-react";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Details
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10 p-8">
          {/* Image */}
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[420px] object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h3>

            <div className="flex items-center gap-3 mt-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

              <span className="font-semibold">
                {product.rating || "N/A"}
              </span>

              <span className="text-gray-500">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            <p className="text-4xl font-bold text-blue-600 mt-6">
              ₹{product.price}
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5 text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Seller
                  </p>

                  <p className="font-semibold">
                    {product.source || "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {product.description && (
              <div className="mt-8">
                <h4 className="font-semibold text-lg mb-2">
                  Description
                </h4>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>
              </div>
            )}

            <div className="mt-auto flex gap-4 pt-10">
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </a>

              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-gray-300 rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;