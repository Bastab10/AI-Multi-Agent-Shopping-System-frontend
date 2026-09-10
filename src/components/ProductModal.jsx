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

  const isCompared = compareProducts.some(
    (item) => item.id === product.id
  );

  const productImage =
    product.image ||
    product.thumbnail ||
    product.productImage;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        bg-black/55
        backdrop-blur-sm
        flex items-center justify-center
        p-2 sm:p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-4xl
          h-auto
          max-h-[calc(100vh-16px)]
          sm:max-h-[88vh]
          overflow-hidden
          rounded-2xl
          border border-white/70
          bg-gradient-to-br
          from-pink-100/95
          via-purple-100/90
          to-purple-200/80
          backdrop-blur-xl
          shadow-[0_4px_20px_rgba(100,80,180,0.12)]
          font-extralight
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="
            absolute
            top-3
            right-3
            z-30
            w-9
            h-9
            rounded-full
            bg-white/35
            border border-white/70
            flex items-center
            justify-center
            text-gray-500
            hover:bg-white/55
            hover:text-gray-900
            transition
          "
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="
            overflow-y-auto
            max-h-[calc(100vh-16px)]
            sm:max-h-[88vh]
          "
        >
          <div
            className="
              grid
              md:grid-cols-2
              gap-5
              md:gap-7
              p-4
              sm:p-5
              md:p-6
            "
          >
            <div className="flex flex-col">
              <div
                className="
                  relative
                  h-[230px]
                  sm:h-[290px]
                  md:h-[340px]
                  rounded-2xl
                  border border-white/65
                  bg-gradient-to-br
                  from-white/30
                  via-pink-50/20
                  to-purple-100/25
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                <div
                  className="
                    absolute
                    w-56
                    h-56
                    rounded-full
                    bg-white/25
                    blur-3xl
                  "
                />

                <img
                  src={productImage}
                  alt={product.title}
                  className="
                    relative
                    z-10
                    max-h-[82%]
                    max-w-[76%]
                    sm:max-w-[72%]
                    md:max-w-[70%]
                    object-contain
                    transition-transform
                    duration-300
                    hover:scale-[1.03]
                  "
                />
              </div>

              <div className="mt-3">
                <div
                  className="
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    rounded-xl
                    border-2
                    border-blue-500
                    bg-white/30
                    flex
                    items-center
                    justify-center
                    p-1.5
                    overflow-hidden
                  "
                >
                  <img
                    src={productImage}
                    alt={product.title}
                    className="
                      w-full
                      h-full
                      object-contain
                    "
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  font-bold
                  text-blue-600
                "
              >
                Product Details
              </p>

              <h2
                className="
                  mt-1.5
                  text-xl
                  sm:text-2xl
                  md:text-[28px]
                  font-extrabold
                  leading-tight
                  tracking-tight
                  text-gray-900
                  pr-8
                "
              >
                {product.title}
              </h2>

              <div
                className="
                  w-10
                  h-[3px]
                  bg-blue-600
                  rounded-full
                  mt-2.5
                "
              />

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  mt-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-1
                    px-2
                    py-1
                    rounded-lg
                    bg-yellow-50/75
                    border border-yellow-100/70
                  "
                >
                  <Star
                    className="
                      w-3.5
                      h-3.5
                      fill-yellow-400
                      text-yellow-400
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-extralight
                    "
                  >
                    {product.rating || "N/A"}
                  </span>
                </div>

                <span
                  className="
                    text-xs
                    text-gray-500
                    font-extralight
                  "
                >
                  ({product.reviews || 0} reviews)
                </span>
              </div>

              <div className="mt-3">
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-wider
                    font-extralight
                    text-gray-500
                  "
                >
                  Current Price
                </p>

                <p
                  className="
                    text-2xl
                    sm:text-3xl
                    font-extralight
                    text-gray-900
                    leading-none
                    mt-0.5
                  "
                >
                  {product.price}
                </p>
              </div>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2.5
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-white/30
                    border border-white/60
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Store className="w-3.5 h-3.5 text-gray-600" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      text-gray-500
                      font-extralight
                    "
                  >
                    Sold by
                  </p>

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      font-extralight
                      text-gray-900
                    "
                  >
                    {product.source || "Unknown Seller"}
                  </p>
                </div>
              </div>

              <div
                className="
                  border-t
                  border-white/60
                  mt-3
                  pt-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-xs
                        sm:text-sm
                        font-extralight
                        text-gray-900
                      "
                    >
                      Compare this product
                    </p>

                    <p
                      className="
                        text-[10px]
                        text-gray-500
                        font-extralight
                      "
                    >
                      Add up to 3 products
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      toggleCompare(product)
                    }
                    className={`
                      w-8
                      h-8
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      transition
                      ${
                        isCompared
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white/30 border-white/70 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                      }
                    `}
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() =>
                    toggleCompare(product)
                  }
                  className={`
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    text-xs
                    font-extralight
                    border-2
                    transition-all
                    duration-200
                    ${
                      isCompared
                        ? "border-blue-600 bg-blue-50/70 text-blue-600"
                        : "border-slate-800 bg-white/25 text-slate-800 hover:bg-white/45"
                    }
                  `}
                >
                  <Scale className="w-3.5 h-3.5" />

                  {isCompared
                    ? "Added"
                    : "Add to Compare"}
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
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    text-xs
                    font-extralight
                    transition-all
                    duration-200
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
                className="
                  mt-2
                  h-8
                  rounded-lg
                  border border-white/70
                  bg-white/25
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-[11px]
                  font-extralight
                  text-gray-600
                  hover:bg-white/45
                  transition
                "
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