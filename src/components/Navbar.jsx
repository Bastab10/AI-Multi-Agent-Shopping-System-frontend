import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ wishlistCount }) {
  return (
    <nav className="navbar">
      <div className="logo">
        🤖 AI Shopping
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/wishlist">Wishlist</Link>

        <div className="wishlist-counter">
          ❤️ {wishlistCount}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;