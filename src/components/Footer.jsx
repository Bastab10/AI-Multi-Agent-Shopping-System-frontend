import { ShoppingBag, Mail, Phone, MapPin, Heart, Share2, Globe, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Compare", path: "/compare" },
  ];

  const socialLinks = [
    { icon: Share2, name: "Share", href: "#" },
    { icon: Globe, name: "Website", href: "#" },
    { icon: MessageCircle, name: "Chat", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">

              <span className="text-2xl font-black">ShopIntel</span>
            </div>
            <p className="text-gray-400">
              AI-powered shopping experience with smart recommendations and product comparisons.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>bastabsaikia@shopintel.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>60 123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>narayanpur,Assam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} ShopIntel. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;
