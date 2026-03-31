import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row g-4">

          {/* Logo + Description */}
          <div className="col-lg-4 col-md-6">
            <div className="footer_box">
              <Link to="/" className="footer_logo">
                Foodie<span>Hub</span>
              </Link>

              <p>
                Fresh food, fast delivery, and delicious meals made with care.
                Enjoy your favorite dishes anytime with FoodieHub.
              </p>

              <div className="footer_socials">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <div className="footer_box">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Menu">Menu</Link></li>
                <li><Link to="/Category">Category</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 col-6">
            <div className="footer_box">
              <h4>Support</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Track Order</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <div className="footer_box">
              <h4>Contact</h4>
              <p>Chandigarh Sector - 25D , India</p>
              <p>+91 98765 43210</p>
              <p>support@foodiehub.com</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer_bottom">
          <p>© 2026 FoodieHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;