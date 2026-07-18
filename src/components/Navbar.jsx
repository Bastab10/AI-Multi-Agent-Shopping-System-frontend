import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Heart,
  Repeat2,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout,
    wishlistCount = 3,
    compareCount = 1,
  } = useAuth();

  const nav = [
    { path: "/", label: "Home" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/compare", label: "Compare" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto h-[76px] px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="logo-container">
          <div className="logo-icon">
            <ShoppingBag size={20} strokeWidth={2.4} className="text-white" />
            <Sparkles size={12} className="logo-sparkle" />
          </div>
          <span className="logo-text">
            Shop<span className="text-blue-600">Intel</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[16px] font-semibold tracking-tight transition-colors ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated && (
            <div className="flex items-center gap-2.5 bg-gray-900 text-white rounded-full pl-2 pr-3.5 h-11 cursor-pointer select-none">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <UserRound size={15} />
              </div>
              <span className="text-[15px] font-semibold whitespace-nowrap">
                {user?.name || "User"}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 h-11 flex items-center gap-2 font-bold text-[15px] transition"
            >
              <LogOut size={17} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden shrink-0"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-6 py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-[15px] font-medium ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t">
              <Link
                to="/wishlist"
                className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm"
              >
                <Heart size={16} /> Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/compare"
                className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm"
              >
                <Repeat2 size={16} /> Compare ({compareCount})
              </Link>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 text-white rounded-full px-5 h-11 flex items-center justify-center gap-2 font-semibold text-sm mt-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
