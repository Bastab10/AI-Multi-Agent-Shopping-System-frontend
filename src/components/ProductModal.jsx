import {
  X,
  Star,
  ShoppingCart,
  ExternalLink,
  Store,
  Scale,
} from "lucide-react";

function ProductModal({
  product,
  onClose,
  compareProducts = [],
  toggleCompare,
}) {
  if (!product) return null;

  const isCompared = compareProducts.some((item) => item.id === product.id);

  const productImage =
    product.image || product.thumbnail || product.productImage;

  return (
    <div
      className="fixed inset-0 z-[100]
      bg-black/55 backdrop-blur-sm
      flex items-center justify-center
      p-2 sm:p-4"
      onClick={onClose}
    >
      
      <div
        className="relative
        w-full max-w-4xl
        h-auto
        max-h-[calc(100vh-16px)]
        sm:max-h-[88vh]
        overflow-hidden
        bg-white
        rounded-2xl
        shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30
          w-9 h-9
          rounded-full
          bg-white
          border border-gray-200
          flex items-center justify-center
          text-gray-500
          hover:bg-gray-50
          hover:text-gray-900
          transition"
        >
          <X className="w-4 h-4" />
        </button>

        
        <div
          className="overflow-y-auto
          max-h-[calc(100vh-16px)]
          sm:max-h-[88vh]"
        >
          <div
            className="grid
            md:grid-cols-2
            gap-4 md:gap-6
            p-4 sm:p-5 md:p-6"
          >
            
            <div>
              
              <div
                className="h-[210px]
                sm:h-[270px]
                md:h-[320px]
                rounded-xl
                bg-gray-50
                border border-gray-100
                flex items-center justify-center
                overflow-hidden"
              >
                <img
                  src={productImage}
                  alt={product.title}
                  className="max-h-[190px]
                  sm:max-h-[230px]
                  md:max-h-[290px]
                  max-w-[82%]
                  object-contain
                  transition-transform
                  duration-300
                  hover:scale-105"
                />
              </div>

              
              <div className="mt-2">
                <div
                  className="w-12 h-12
                  sm:w-14 sm:h-14
                  rounded-lg
                  border-2 border-blue-500
                  bg-gray-50
                  flex items-center justify-center
                  p-1"
                >
                  <img
                    src={productImage}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            
            <div className="flex flex-col">
              
              <p
                className="text-[10px]
                uppercase
                tracking-[0.18em]
                font-bold
                text-blue-600"
              >
                Product Details
              </p>

              
              <h2
                className="mt-1.5
                text-xl
                sm:text-2xl
                md:text-[28px]
                font-extrabold
                leading-tight
                tracking-tight
                text-gray-900
                pr-8"
              >
                {product.title}
              </h2>

              
              <div
                className="w-10 h-[3px]
                bg-blue-600
                rounded-full
                mt-2.5"
              />

              
              <div
                className="flex items-center
                gap-2.5 mt-3"
              >
                <div
                  className="flex items-center gap-1
                  px-2 py-1
                  rounded-lg
                  bg-yellow-50"
                >
                  <Star
                    className="w-3.5 h-3.5
                    fill-yellow-400
                    text-yellow-400"
                  />

                  <span className="text-xs font-bold">
                    {product.rating || "N/A"}
                  </span>
                </div>

                <span className="text-xs text-gray-500">
                  ({product.reviews || 0} reviews)
                </span>
              </div>

              
              <div className="mt-3">
                <p
                  className="text-[9px]
                  uppercase
                  tracking-wider
                  font-semibold
                  text-gray-400"
                >
                  Current Price
                </p>

                <p
                  className="text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-gray-900
                  leading-none
                  mt-0.5"
                >
                  {product.price}
                </p>
              </div>

              
              <div
                className="mt-3
                flex items-center gap-2.5"
              >
                <div
                  className="w-8 h-8
                  rounded-full
                  bg-gray-100
                  flex items-center justify-center"
                >
                  <Store className="w-3.5 h-3.5 text-gray-600" />
                </div>

                <div>
                  <p className="text-[10px] text-gray-400">Sold by</p>

                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    {product.source || "Unknown Seller"}
                  </p>
                </div>
              </div>

              
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div
                  className="flex items-center
                  justify-between"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      Compare this product
                    </p>

                    <p className="text-[10px] text-gray-400">
                      Add up to 3 products
                    </p>
                  </div>

                  <button
                    onClick={() => toggleCompare(product)}
                    className={`w-8 h-8 rounded-full
                    border
                    flex items-center justify-center
                    transition
                    ${
                      isCompared
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                
                <button
                  onClick={() => toggleCompare(product)}
                  className={`
      h-10
      rounded-full
      flex items-center
      justify-center
      gap-1.5
      text-xs
      font-bold
      border-2
      transition-all duration-200
      ${
        isCompared
          ? "border-blue-600 bg-blue-50 text-blue-600"
          : "border-slate-800 bg-white text-slate-800 hover:bg-slate-50"
      }
    `}
                >
                  <Scale className="w-3.5 h-3.5" />
                  {isCompared ? "Added" : "Add to Compare"}
                </button>

                
                <a
                  href={product.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
      h-10
      rounded-full
      bg-slate-900
      hover:bg-slate-800
      text-white
      flex items-center
      justify-center
      gap-1.5
      text-xs
      font-bold
      transition-all duration-200
      hover:shadow-md
    "
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Buy Now
                </a>
              </div>

              
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2
                h-8
                rounded-lg
                border border-gray-200
                flex items-center
                justify-center
                gap-1.5
                text-[11px]
                font-medium
                text-gray-600
                hover:bg-gray-50
                transition"
              >
                <ExternalLink className="w-3 h-3" />
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
