import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaHeadset } from "react-icons/fa6";

function FAQSection({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
   <section className="faq_section py-3" id="faq">
      <div className="container">

        {/* TOP HEADING */}
        <div className="faq_heading text-center pb-5">
          <span className="faq_tag">Help & Support</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Got questions about delivery, payments, or food quality? 
            We’ve answered the most common things here to make your 
            ordering experience smooth and easy.
          </p>
        </div>

        {/* CONTENT */}
        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-lg-5">
            <div className="faq_left_box">

               {/* MAIN CARD */}
                <div className="faq_left_card">

                  {/* support */}
                  <div className="faq_support_card">
                    <div className="faq_support_icon">
                      <FaHeadset />
                    </div>
                    <div className="faq_support_text">
                      <h4>Need more help?</h4>
                      <p>Our support team is here to help you anytime.</p>
                    </div>
                  </div>

                  {/* divider */}
                  <div className="faq_divider"></div>

                  {/* points */}
                  <ul className="faq_points">
                    <li>🚀 Fast Delivery in 30 mins</li>
                    <li>🥗 Fresh & Hygienic Food</li>
                    <li>💳 Easy Payment Options</li>
                  </ul>

                  {/* highlight */}
                  <div className="faq_highlight">
                    <h5>🔥 1000+ Happy Customers</h5>
                  </div>

                  {/* button */}
                  <Link to="/contact" className="faq_contact_btn">
                    Contact Us
                  </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-7">
            <div className="faq_right_box">
              {items.map((faq, index) => (
                <div
                  className={`faq_item ${activeIndex === index ? "active" : ""}`}
                  key={faq.id}
                >
                  <button
                    className="faq_question"
                    type="button"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <div className="faq_icon">
                      {activeIndex === index ? <FaMinus /> : <FaPlus />}
                    </div>
                  </button>

                  <div className={`faq_answer ${activeIndex === index ? "show" : ""}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
   
  );
}

export default FAQSection;