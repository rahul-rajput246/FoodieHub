import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaRegCommentDots,
} from "react-icons/fa";

function ContactFormSection() {
  return (
    <section className="contact_form_section py-3   ">
      <div className="container">
        <div className="contact_form_wrapper">
          <div className="row contactForm_box align-items-center g-5">
            
            <div className="col-lg-5">
              <div className="contact_form_content">
                <span className="contact_badge">Contact Us</span>
                <h2>Let’s Start a <span>Conversation</span></h2>
                <p>
                  Got a question, food request, or feedback? We’re always ready
                  to hear from you and help you out.
                </p>

                <div className="contact_points">
                  <div className="contact_point">
                    <span></span>
                    <p>Quick response from our team</p>
                  </div>
                  <div className="contact_point">
                    <span></span>
                    <p>Easy support for orders & queries</p>
                  </div>
                  <div className="contact_point">
                    <span></span>
                    <p>Friendly service with FoodieHub style</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact_form_box form_fileds">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="input_box">
                        <FaUser className="input_icon" />
                        <input type="text" placeholder="Your Name" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="input_box">
                        <FaEnvelope className="input_icon" />
                        <input type="email" placeholder="Your Email" />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input_box">
                        <FaPhoneAlt className="input_icon" />
                        <input type="text" placeholder="Phone Number" />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input_box textarea_box">
                        <FaRegCommentDots className="input_icon" />
                        <textarea rows="5" placeholder="Write your message..."></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="contact_send_btn">
                        Send Message
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