import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LegalPages.css";

function PrivacyPolicy({ totalQty, user }) {
  return (
    <>
      <Navbar totalQty={totalQty} user={user} />

      {/* Hero Banner Section */}
      <section className="legal_breadcrumb_hero">
        <div className="container">
          <div className="breadcrumb_nav">
            <Link to="/" className="breadcrumb_link">Home</Link>
            <span className="breadcrumb_sep">›</span>
            <span className="breadcrumb_current">Privacy Policy</span>
          </div>

          <span className="legal_badge_pill">DATA PROTECTION & PRIVACY</span>
          <h1 className="legal_hero_title">FoodieHub Privacy Policy</h1>
          <p className="legal_hero_subtitle">
            How we protect, process, and respect your personal and location data
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="legal_page_main">
        <div className="container">
          <div className="legal_layout_grid">

            {/* Sticky Table of Contents Sidebar */}
            <aside className="legal_sidebar_nav">
              <h4 className="legal_nav_title">Navigation</h4>
              <ul className="legal_nav_list">
                <li><a href="#intro" className="legal_nav_link"><span>1.</span> Introduction</a></li>
                <li><a href="#data-collected" className="legal_nav_link"><span>2.</span> Information We Collect</a></li>
                <li><a href="#how-we-use" className="legal_nav_link"><span>3.</span> How We Use Data</a></li>
                <li><a href="#gps-policy" className="legal_nav_link"><span>4.</span> GPS & Location Policy</a></li>
                <li><a href="#payment-security" className="legal_nav_link"><span>5.</span> Payment Security</a></li>
                <li><a href="#third-parties" className="legal_nav_link"><span>6.</span> Delivery Partner Sharing</a></li>
                <li><a href="#cookies" className="legal_nav_link"><span>7.</span> Cookies & Local Storage</a></li>
                <li><a href="#user-rights" className="legal_nav_link"><span>8.</span> Your Privacy Rights</a></li>
                <li><a href="#contact-officer" className="legal_nav_link"><span>9.</span> Contact Us</a></li>
              </ul>

              <div className="legal_sidebar_contact_box">
                <h5>Need Help?</h5>
                <p>Have questions about your personal data?</p>
                <Link to="/contact" className="legal_contact_mini_btn">Contact Support</Link>
              </div>
            </aside>

            {/* Legal Text Body */}
            <article className="legal_content_wrapper">
              
              <div className="legal_meta_header">
                <span className="legal_meta_badge">
                  🛡️ Last Updated: October 2026
                </span>
                <span className="legal_jurisdiction_badge">
                  📍 Applicable Jurisdiction: Chandigarh, India
                </span>
              </div>

              {/* Section 1 */}
              <section id="intro" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">1</span>
                  Introduction & Commitment
                </h3>
                <p>
                  Welcome to <strong>FoodieHub</strong> ("we", "our", or "us"). We are committed to safeguarding your privacy and ensuring your personal information is collected, processed, and maintained in a secure and transparent manner.
                </p>
                <p>
                  This Privacy Policy applies to our website, mobile interface, food ordering portal, and live order tracking systems. By using FoodieHub services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Section 2 */}
              <section id="data-collected" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">2</span>
                  Information We Collect
                </h3>
                <p>To provide high-speed food delivery and order fulfillment, we collect the following categories of information:</p>
                <ul className="legal_bullet_list">
                  <li><strong>Account Information:</strong> Your full name, email address, password hash, and contact phone number.</li>
                  <li><strong>Delivery Details:</strong> House/flat number, street address, sector, city, landmark, and postal code.</li>
                  <li><strong>Order History:</strong> Dish selections, quantities, special dietary instructions, order totals, and payment methods (Cash on Delivery / Razorpay).</li>
                  <li><strong>Device & Network Data:</strong> IP address, browser type, operating system, and referral headers used for security auditing.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="how-we-use" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">3</span>
                  How We Use Your Information
                </h3>
                <p>We process your data exclusively for legitimate operational purposes:</p>
                <ul className="legal_bullet_list">
                  <li>Processing, preparing, and packaging your food orders with our culinary staff.</li>
                  <li>Assigning orders to verified delivery riders and computing real-time driving routes.</li>
                  <li>Sending automated order confirmation emails, invoices, and delivery ETA alerts.</li>
                  <li>Preventing fraud, unauthorized order manipulation, and protecting platform integrity.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="gps-policy" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">4</span>
                  Real-Time GPS Tracking & Privacy Protection
                </h3>
                <p>
                  FoodieHub features a live GPS order tracking system powered by road-snapped OpenStreetMap and OSRM routing. Here is how your location data is handled:
                </p>
                <div className="legal_callout_box callout_security">
                  <h6>🔒 Unique Order ID Security Shield</h6>
                  <p>
                    Live tracking requires your secret, high-entropy <strong>Unique Order Number (e.g., ORD-2026-69F350D5D3BF9)</strong>. Sequential numeric IDs (1, 2, 3...) are strictly blocked to prevent unauthorized individuals from snooping on your delivery address or contact number.
                  </p>
                </div>
                <ul className="legal_bullet_list">
                  <li>Destination coordinates are derived only from the delivery address you submit during checkout.</li>
                  <li>Rider GPS telemetry is active strictly while your order is marked as <em>Out for Delivery</em> and ceases immediately upon delivery completion.</li>
                  <li>We do not record, store, or sell permanent customer background geolocation traces.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="payment-security" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">5</span>
                  Payment Security & Gateway Protection
                </h3>
                <p>
                  Online transactions on FoodieHub are processed through <strong>Razorpay</strong>, an RBI-licensed, PCI-DSS Level 1 compliant payment gateway:
                </p>
                <ul className="legal_bullet_list">
                  <li><strong>We NEVER store credit/debit card numbers, CVVs, or Netbanking passwords</strong> on FoodieHub servers.</li>
                  <li>All online payment sessions use end-to-end 256-bit TLS/SSL encryption.</li>
                  <li>For Cash on Delivery (COD) orders, payment is made directly to the authorized delivery rider upon physical handover.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="third-parties" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">6</span>
                  Delivery Partners & Information Sharing
                </h3>
                <p>
                  We do not sell, rent, or trade your personal data. Limited order information is shared strictly with:
                </p>
                <ul className="legal_bullet_list">
                  <li><strong>Assigned Delivery Partner:</strong> Given your delivery address, name, and masked phone number to deliver your meal.</li>
                  <li><strong>Kitchen Staff:</strong> Receives items ordered and food preparation notes.</li>
                  <li><strong>Legal Authorities:</strong> Only when mandatory under applicable Indian legislation or court subpoenas.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="cookies" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">7</span>
                  Cookies & Local Storage
                </h3>
                <p>
                  Our application uses session cookies and browser LocalStorage to maintain your active cart items, keep you authenticated via Laravel Sanctum CSRF cookies, and cache your most recent order number for convenient tracking. You can clear cookies at any time via your browser settings.
                </p>
              </section>

              {/* Section 8 */}
              <section id="user-rights" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">8</span>
                  Your Rights & Data Choices
                </h3>
                <p>Under Indian digital data protection standards, you have the right to:</p>
                <ul className="legal_bullet_list">
                  <li>Access and review all personal information associated with your account.</li>
                  <li>Update or correct your saved delivery addresses and contact information.</li>
                  <li>Request permanent account deletion and removal of transaction histories (subject to tax invoice retention laws).</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="contact-officer" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">9</span>
                  Grievance Officer & Contact
                </h3>
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or your data, reach out to our Grievance Officer:
                </p>

                <div className="legal_contact_grid">
                  <div className="legal_contact_card">
                    <div className="legal_contact_icon">✉️</div>
                    <strong>Email Support</strong>
                    <span>support@foodiehub.com</span>
                  </div>
                  <div className="legal_contact_card">
                    <div className="legal_contact_icon">📞</div>
                    <strong>Customer Helpline</strong>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="legal_contact_card">
                    <div className="legal_contact_icon">🏢</div>
                    <strong>Headquarters</strong>
                    <span>Sector 25D, Chandigarh, India</span>
                  </div>
                </div>
              </section>

            </article>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
