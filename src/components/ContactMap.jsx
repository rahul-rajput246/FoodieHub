import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";

function ContactMapSection() {
  return (
    <section className="contact_map_section py-3">
      <div className="container">
        <div className="contact_map_wrapper">
          <div className="row g-4 align-items-center">
            
            <div className="col-lg-7">
              <div className="map_box">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2255039748975!2d76.69504167419187!3d30.712060286633957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feff7e0e2421f%3A0x1932dde5487c0b94!2sShivah%20Web%20Tech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1775472547082!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FoodieHub Location"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="visit_us_box">
                <span className="visit_badge">Visit Us</span>
                <h2>Come & Enjoy Food With Us</h2>
                <p>
                  Stop by our place for fresh flavors, quick service, and a
                  warm FoodieHub experience.
                </p>

                <div className="visit_info">
                  <div className="visit_item">
                    <FaMapMarkerAlt className="visit_icon" />
                    <div>
                      <h6>Location</h6>
                      <p>Karimpur, India</p>
                    </div>
                  </div>

                  <div className="visit_item">
                    <FaClock className="visit_icon" />
                    <div>
                      <h6>Opening Hours</h6>
                      <p>10:00 AM - 11:00 PM</p>
                    </div>
                  </div>

                  <div className="visit_item">
                    <FaPhoneAlt className="visit_icon" />
                    <div>
                      <h6>Contact</h6>
                      <p>+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <button className="visit_btn">Get Directions</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMapSection;