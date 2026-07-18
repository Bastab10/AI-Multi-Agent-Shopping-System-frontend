import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black tracking-tight">ShopIntel</h2>

            <p className="mt-5 text-gray-400 leading-7">
              AI-powered shopping assistant that helps you compare products,
              discover better deals and make smarter buying decisions.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>

              <Link
                to="/wishlist"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Wishlist
              </Link>

              <Link
                to="/compare"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Compare
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-5">Contact</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                bastabsaikia@shopintel.com
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                +91 600135****
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                North Lakhimpur - Assam, India
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-5">Connect</h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <Globe size={20} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <Mail size={20} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {year} ShopIntel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
