import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className=" bg-[#071713] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-400">
                <span className="text-sm font-black font-extralight text-[#071713]">
                  S
                </span>
              </div>

              <h2 className="text-xl font-semibold font-extralight">
                ShopIntel
              </h2>
            </div>

            <p className="mt-4 max-w-xs text-xs leading-6 font-extralight  text-gray-400">
              AI-powered shopping assistant that helps you compare products,
              discover better deals and make smarter buying decisions.
            </p>

            {/* ================= SUBSCRIBE ================= */}
            <div className="mt-5 flex h-10 max-w-[300px] items-center rounded-full border border-emerald-900 bg-[#0c2922] p-1">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="button"
                className="flex h-8 items-center gap-1 rounded-full bg-white px-4 text-xs font-medium text-gray-900 transition hover:bg-emerald-100"
              >
                Subscribe
                <Send size={12} />
              </button>
            </div>
          </div>

          {/* ================= PAGES ================= */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Pages
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-xs text-gray-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/wishlist"
                className="text-xs text-gray-400 transition hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                to="/compare"
                className="text-xs text-gray-400 transition hover:text-white"
              >
                Compare
              </Link>

              <Link
                to="/"
                className="text-xs text-gray-400 transition hover:text-white"
              >
                Shopping
              </Link>
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Services
            </h3>

            <div className="flex flex-col gap-3">
              <span className="text-xs text-gray-400">
                AI Product Search
              </span>

              <span className="text-xs text-gray-400">
                Product Comparison
              </span>

              <span className="text-xs text-gray-400">
                Smart Recommendations
              </span>

              <span className="text-xs text-gray-400">
                Deal Discovery
              </span>

              <span className="text-xs text-gray-400">
                Wishlist Management
              </span>
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="mb-5 text-sm font-semibold">
              Contact
            </h3>

            <div className="space-y-3">

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0 text-gray-400"
                />

                <span className="text-xs text-gray-400">
                  bastabsaikia@shopintel.com
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone
                  size={15}
                  className="shrink-0 text-gray-400"
                />

                <span className="text-xs text-gray-400">
                  +91 600135****
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-gray-400"
                />

                <span className="text-xs leading-5 text-gray-400">
                  North Lakhimpur - Assam, India
                </span>
              </div>

            </div>

            {/* ================= SOCIAL / CONNECT ================= */}
            <div className="mt-5 flex gap-2">

              <a
                href="#"
                aria-label="Website"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12332b] text-gray-400 transition hover:bg-emerald-500 hover:text-white"
              >
                <Globe size={14} />
              </a>

              <a
                href="#"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12332b] text-gray-400 transition hover:bg-emerald-500 hover:text-white"
              >
                <Mail size={14} />
              </a>

              <a
                href="#"
                aria-label="Phone"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12332b] text-gray-400 transition hover:bg-emerald-500 hover:text-white"
              >
                <Phone size={14} />
              </a>

            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-5 md:flex-row md:items-center md:justify-between">

          {/* Copyright */}
          <p className="text-[11px] text-gray-500">
            © {year} ShopIntel. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            <Link
              to="#"
              className="text-[11px] text-gray-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="#"
              className="text-[11px] text-gray-500 transition hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              to="#"
              className="text-[11px] text-gray-500 transition hover:text-white"
            >
              Security
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;