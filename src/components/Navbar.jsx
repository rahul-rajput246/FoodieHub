import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Navbar({ addToCart = [] }) {
  return (
    <nav className="navbar navbar-expand-lg custom_navbar">
      <div className="container">
        <Link to="/" className="navbar-brand logo_text">
          Foodie<span>Hub</span>
        </Link>

        <button
          className="navbar-toggler custom_toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          
		  <div className="navbar-nav mx-auto nav_links">
            <Link to="/">Home</Link>
            <Link to="/Menu">Menu</Link>
            <Link to="/Category">Category</Link>
            <Link to="/About">About</Link>
            <Link to="/Contact">Contact</Link>
          </div>

          <div className="right_nav_box">
            <Link to="/login" className="login_btn">
              <FaUser /> Login
            </Link>
            <Link to="/cart" className="cart_btn">
              <FaShoppingCart /> Cart
                {addToCart.length > 0 && (
                  <span>({addToCart.length})</span>
                )}
               
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;