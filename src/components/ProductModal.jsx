import { X, Star, ShoppingCart, ExternalLink, Store, Award } from "lucide-react";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">Product Details</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-lg">{product.rating || "N/A"}</span>
              </div>
              <span className="text-text-secondary">({product.reviews || 0} reviews)</span>
            </div>

            <p className="text-4xl font-black text-primary-600 mb-6">
              ₹{product.price}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Store className="w-5 h-5 text-text-secondary" />
                <div>
                  <p className="text-sm text-text-secondary">Seller</p>
                  <p className="font-semibold text-text-primary">{product.source || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                <Award className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-text-secondary">AI Rating</p>
                  <p className="font-semibold text-primary-600">Highly Recommended</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </a>
              
              <button className="btn-secondary w-full flex items-center justify-center gap-2 py-4 text-lg">
                <ExternalLink className="w-5 h-5" />
                View on {product.source || "Store"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;