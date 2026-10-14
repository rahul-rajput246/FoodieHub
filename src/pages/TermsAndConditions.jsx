import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LegalPages.css";

function TermsAndConditions({ totalQty, user }) {
  return (
    <>
      <Navbar totalQty={totalQty} user={user} />

      {/* Hero Banner Section */}
      <section className="legal_breadcrumb_hero">
        <div className="container">
          <div className="breadcrumb_nav">
            <Link to="/" className="breadcrumb_link">Home</Link>
            <span className="breadcrumb_sep">›</span>
            <span className="breadcrumb_current">Terms & Conditions</span>
          </div>

          <span className="legal_badge_pill">SERVICE AGREEMENT</span>
          <h1 className="legal_hero_title">Terms and Conditions</h1>
          <p className="legal_hero_subtitle">
            Please read these terms carefully before ordering from FoodieHub
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
                <li><a href="#acceptance" className="legal_nav_link"><span>1.</span> Acceptance</a></li>
                <li><a href="#accounts" className="legal_nav_link"><span>2.</span> User Accounts</a></li>
                <li><a href="#orders" className="legal_nav_link"><span>3.</span> Orders & Pricing</a></li>
                <li><a href="#payments" className="legal_nav_link"><span>4.</span> Payments & Invoices</a></li>
                <li><a href="#delivery" className="legal_nav_link"><span>5.</span> Delivery & GPS</a></li>
                <li><a href="#cancellations" className="legal_nav_link"><span>6.</span> Cancellations & Refunds</a></li>
                <li><a href="#food-safety" className="legal_nav_link"><span>7.</span> Food Safety & Allergens</a></li>
                <li><a href="#ip" className="legal_nav_link"><span>8.</span> Intellectual Property</a></li>
                <li><a href="#governing-law" className="legal_nav_link"><span>9.</span> Jurisdiction & Law</a></li>
              </ul>

              <div className="legal_sidebar_contact_box">
                <h5>Got a Question?</h5>
                <p>Our support team is here to help 24/7.</p>
                <Link to="/contact" className="legal_contact_mini_btn">Get in Touch</Link>
              </div>
            </aside>

            {/* Legal Text Body */}
            <article className="legal_content_wrapper">
              
              <div className="legal_meta_header">
                <span className="legal_meta_badge">
                  ⚖️ Last Revised: October 2026
                </span>
                <span className="legal_jurisdiction_badge">
                  📍 Courts of Chandigarh, India
                </span>
              </div>

              {/* Section 1 */}
              <section id="acceptance" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">1</span>
                  Acceptance of Terms
                </h3>
                <p>
                  These Terms and Conditions constitute a legally binding agreement between you ("Customer", "User") and <strong>FoodieHub</strong> ("Company", "we", "us").
                </p>
                <p>
                  By accessing our website, browsing food items, or placing an order, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not agree, you must discontinue using our services.
                </p>
              </section>

              {/* Section 2 */}
              <section id="accounts" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">2</span>
                  User Accounts & Responsibilities
                </h3>
                <ul className="legal_bullet_list">
                  <li>You must provide accurate, complete, and updated delivery and contact details during account registration and checkout.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials and are fully liable for all activities that occur under your account.</li>
                  <li>FoodieHub reserves the right to suspend or terminate accounts that provide misleading information or engage in fraudulent activities.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="orders" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">3</span>
                  Orders, Menu Pricing & Availability
                </h3>
                <p>
                  All food items displayed on FoodieHub are subject to kitchen ingredient availability. Prices are listed in Indian Rupees (INR) and are inclusive of applicable GST taxes.
                </p>
                <ul className="legal_bullet_list">
                  <li>An order confirmation is issued once your order is accepted by our central kitchen.</li>
                  <li>We reserve the right to decline or modify orders in instances of stock exhaustion, extreme weather disruptions, or unforeseen operational issues.</li>
                  <li>Free delivery is applied automatically on eligible qualifying cart totals (e.g. orders above ₹499).</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="payments" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">4</span>
                  Payments, Invoices & Billing
                </h3>
                <p>FoodieHub supports secure multi-channel payments:</p>
                <ul className="legal_bullet_list">
                  <li><strong>Online Payments:</strong> Supported via Razorpay including UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Netbanking.</li>
                  <li><strong>Cash on Delivery (COD):</strong> Payment must be tendered in exact or manageable cash to the delivery rider upon arrival.</li>
                  <li><strong>Invoices:</strong> A tax-compliant, downloadable PDF invoice is generated for every completed transaction and emailed to your registered address.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="delivery" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">5</span>
                  Real-time Delivery & Live GPS Tracking
                </h3>
                <p>
                  We strive to deliver fresh, piping-hot meals within the estimated 25–40 minute window. However, delivery timelines are estimates and may vary due to traffic, weather, or rush hours.
                </p>
                <div className="legal_callout_box">
                  <h6>🛵 Customer Availability at Drop Location</h6>
                  <p>
                    Please ensure you or an authorized representative is available at the provided mobile number and delivery address. If the rider cannot reach you after reasonable attempts, the order may be cancelled with applicable charges.
                  </p>
                </div>
                <p>
                  Our live GPS map shows real-time rider street movement via OSRM road routing. Tracking details are accessible solely via your confidential Order ID.
                </p>
              </section>

              {/* Section 6 */}
              <section id="cancellations" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">6</span>
                  Cancellations & Refund Policy
                </h3>
                <ul className="legal_bullet_list">
                  <li><strong>Cancellation Window:</strong> You may cancel an order within 60 seconds of placement free of charge while in <em>Pending</em> status.</li>
                  <li><strong>Preparation Cut-Off:</strong> Once the kitchen begins cooking (<em>Preparing Food</em> status) or the rider is dispatched (<em>Out for Delivery</em>), cancellations cannot be accepted as fresh food has already been prepared.</li>
                  <li><strong>Eligible Refunds:</strong> In the rare event of missing items, incorrect dishes, or non-delivery due to rider fault, verified refunds are processed back to your original payment method within 5–7 business days.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="food-safety" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">7</span>
                  Food Quality, Allergens & Consumption
                </h3>
                <p>
                  FoodieHub adheres to stringent food safety, hygiene, and kitchen sanitation guidelines under FSSAI regulations.
                </p>
                <ul className="legal_bullet_list">
                  <li>Meals should be consumed within 2 hours of delivery for optimum taste and food safety.</li>
                  <li>If you have specific food allergies (nuts, dairy, gluten, shellfish), please specify in the order notes prior to placing your order.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="ip" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">8</span>
                  Intellectual Property
                </h3>
                <p>
                  All content, branding, trademarks, logos, UI designs, illustrations, and proprietary software comprising FoodieHub are the exclusive property of FoodieHub. Unauthorized scraping, copying, or redistribution is strictly prohibited.
                </p>
              </section>

              {/* Section 9 */}
              <section id="governing-law" className="legal_section_card">
                <h3 className="legal_section_heading">
                  <span className="legal_section_num">9</span>
                  Governing Law & Jurisdiction
                </h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to FoodieHub services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Chandigarh, India</strong>.
                </p>

                <div className="legal_contact_grid">
                  <div className="legal_contact_card">
                    <div className="legal_contact_icon">⚖️</div>
                    <strong>Legal Inquiries</strong>
                    <span>legal@foodiehub.com</span>
                  </div>
                  <div className="legal_contact_card">
                    <div className="legal_contact_icon">💬</div>
                    <strong>Customer Support</strong>
                    <span>support@foodiehub.com</span>
                  </div>
                  <div className="legal_contact_card">
                    <div className="legal_contact_icon">📍</div>
                    <strong>Registered Office</strong>
                    <span>Sector 25D, Chandigarh - 160014</span>
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

export default TermsAndConditions;
