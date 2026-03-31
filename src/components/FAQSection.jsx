import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";

function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: "How long does delivery take?",
      answer:
        "We usually deliver your order within 25 to 35 minutes, depending on your location, traffic, and order size.",
    },
    {
      id: 2,
      question: "Do you offer cash on delivery?",
      answer:
        "Yes, we offer cash on delivery along with secure online payment options for your convenience.",
    },
    {
      id: 3,
      question: "Can I track my order in real time?",
      answer:
        "Yes, once your order is confirmed, you can track its status and delivery progress in real time.",
    },
    {
      id: 4,
      question: "Are your ingredients fresh?",
      answer:
        "Absolutely. We use fresh and high-quality ingredients to prepare every meal with great taste and care.",
    },
    {
      id: 5,
      question: "Can I cancel or change my order?",
      answer:
        "Yes, you can request changes or cancellation within a few minutes of placing the order, before preparation begins.",
    },
    {
      id: 6,
      question: "Do you offer discounts or special deals?",
      answer:
        "Yes, we regularly provide exciting discounts, combo offers, and limited-time deals on popular menu items.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq_section py-5">
      <div className="container">
        <div className="faq_heading text-center pb-4">
          <span className="faq_tag">Help & Support</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Find quick answers to common questions about ordering, delivery,
            payment, and food quality at FoodieHub.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="faq_main_box">
              {faqs.map((item, index) => (
                <div
                  className={`faq_item ${activeIndex === index ? "active" : ""}`}
                  key={item.id}
                >
                  <button
                    className="faq_question"
                    onClick={() => toggleFAQ(index)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <div className="faq_icon">
                      {activeIndex === index ? <FaMinus /> : <FaPlus />}
                    </div>
                  </button>

                  <div className={`faq_answer ${activeIndex === index ? "show" : ""}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq_bottom text-center pt-4">
              <p>Still have questions? We’re here to help you.</p>
              <Link to="/contact" className="faq_contact_btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;