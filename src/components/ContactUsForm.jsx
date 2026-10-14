import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaRegCommentDots,
} from "react-icons/fa";
import { API_BASE_URL } from "../config";

function ContactFormSection({ details }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback({
        type: "error",
        message: "Please fill in all required fields (Name, Email, and Message).",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: data.message || "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errMsg =
          data.message ||
          (data.errors ? Object.values(data.errors)[0][0] : "Failed to send message.");
        setFeedback({ type: "error", message: errMsg });
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      setFeedback({
        type: "error",
        message: "Failed to connect to the server. Please check your network and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact_form_section py-3">
      <div className="container">
        <div className="contact_form_wrapper">
          <div className="row contactForm_box align-items-center g-5">
            
            <div className="col-lg-5">
              <div className="contact_form_content">
                <span className="contact_badge">{details?.content?.contact_form?.subtitle}</span>
                <h2>{details?.content?.contact_form?.title} <span>{details?.content?.contact_form?.color_title}</span></h2>
                <p>
                  {details?.content?.contact_form?.desc}
                </p>

                <div className="contact_points">
                  <div className="contact_point">
                    <span></span>
                    <p>{details?.content?.contact_form?.point1}</p>
                  </div>
                  <div className="contact_point">
                    <span></span>
                    <p>{details?.content?.contact_form?.point2}</p>
                  </div>
                  <div className="contact_point">
                    <span></span>
                    <p>{details?.content?.contact_form?.point3}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact_form_box form_fileds">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    {feedback.message && (
                      <div className="col-12">
                        <div
                          style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            fontSize: "14px",
                            fontWeight: "500",
                            backgroundColor: feedback.type === "success" ? "#d1fae5" : "#fee2e2",
                            color: feedback.type === "success" ? "#065f46" : "#991b1b",
                            border: `1px solid ${feedback.type === "success" ? "#a7f3d0" : "#fecaca"}`,
                          }}
                        >
                          {feedback.type === "success" ? "✓ " : "✕ "}
                          {feedback.message}
                        </div>
                      </div>
                    )}

                    <div className="col-md-6">
                      <div className="input_box">
                        <FaUser className="input_icon" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="input_box">
                        <FaEnvelope className="input_icon" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email *"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input_box">
                        <FaPhoneAlt className="input_icon" />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number (Optional)"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input_box textarea_box">
                        <FaRegCommentDots className="input_icon" />
                        <textarea
                          rows="5"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message... *"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={loading}
                        className="contact_send_btn"
                        style={{
                          opacity: loading ? 0.75 : 1,
                          cursor: loading ? "wait" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              style={{
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                border: "2px solid rgba(255,255,255,0.4)",
                                borderTopColor: "#fff",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite",
                              }}
                            ></span>
                            <span>Sending...</span>
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFormSection;