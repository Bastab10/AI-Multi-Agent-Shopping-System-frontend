import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  UserRound,
  LogIn,
  LogOut,
  Menu,
  X,
  Heart,
  Repeat2,
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
    wishlistCount = 0,
    compareCount = 0,
  } = useAuth();

  const nav = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/wishlist",
      label: "Wishlist",
    },
    {
      path: "/compare",
      label: "Compare",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto h-[68px] px-5 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Sparkles
              size={18}
              strokeWidth={2}
              className="text-gray-900 group-hover:text-blue-600 transition-colors"
            />
          </div>

          <span className="text-[20px] font-medium tracking-tight text-gray-900">
            Shop<span className="text-blue-600">Intel</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          {nav.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-2.5
                  py-2
                  text-[14px]
                  font-medium
                  transition-colors
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              title="Logout"
              className="
                ml-2
                flex
                items-center
                gap-2
                text-[14px]
                font-medium
                text-red-500
                hover:text-red-600
                transition-colors
              "
            >
              <LogOut size={16} strokeWidth={2.2} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="
                ml-2
                flex
                items-center
                gap-2
                text-[14px]
                font-medium
                text-red-500
                hover:text-red-600
                transition-colors
              "
            >
              <LogIn size={16} strokeWidth={2.2} />
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            lg:hidden
            w-9
            h-9
            rounded-lg
            flex
            items-center
            justify-center
            text-gray-700
            hover:bg-gray-100
            transition
          "
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-5 sm:px-6 py-4 flex flex-col gap-2">
            {nav.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    rounded-xl
                    text-[14px]
                    font-medium
                    transition
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <span>{item.label}</span>

                  {item.path === "/wishlist" && (
                    <span className="text-xs text-gray-400">
                      {wishlistCount}
                    </span>
                  )}

                  {item.path === "/compare" && (
                    <span className="text-xs text-gray-400">
                      {compareCount}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="flex items-center gap-3 pt-3 mt-2 border-t border-gray-100">
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="
                  flex-1
                  h-9
                  rounded-lg
                  bg-gray-50
                  hover:bg-blue-50
                  text-gray-700
                  hover:text-blue-600
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-xs
                  font-medium
                  transition
                "
              >
                <Heart size={15} />
                Wishlist ({wishlistCount})
              </Link>

              <Link
                to="/compare"
                onClick={() => setMenuOpen(false)}
                className="
                  flex-1
                  h-9
                  rounded-lg
                  bg-gray-50
                  hover:bg-blue-50
                  text-gray-700
                  hover:text-blue-600
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  text-xs
                  font-medium
                  transition
                "
              >
                <Repeat2 size={15} />
                Compare ({compareCount})
              </Link>
            </div>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <UserRound size={15} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {user?.name || "User"}
                    </span>

                    <span className="text-[11px] text-gray-400">Account</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    h-10
                    mt-2
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    text-red-500
                    hover:text-red-600
                    transition-colors
                  "
                >
                  <LogOut size={16} strokeWidth={2.2} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  w-full
                  h-10
                  mt-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-medium
                  text-red-500
                  hover:text-red-600
                  transition-colors
                "
              >
                <LogIn size={16} strokeWidth={2.2} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
