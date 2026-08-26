import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
function ContactMapSection({ details }) {
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
                <span className="visit_badge">{details?.content?.contact_visit?.subtitle}</span>
                <h2>{details?.content?.contact_visit?.title}</h2>
                <p>
                  {details?.content?.contact_visit?.desc}
                </p>

                <div className="visit_info">
                  <div className="visit_item">
                    <FaMapMarkerAlt className="visit_icon" />
                    <div>
                      <h6>{details?.content?.contact_visit?.locationTitle}</h6>
                      <p>{details?.content?.contact_visit?.locationSubtitle}</p>
                    </div>
                  </div>

                  <div className="visit_item">
                    <FaClock className="visit_icon" />
                    <div> 
                      <h6>{details?.content?.contact_visit?.timingTitle}</h6>
                      <p>{details?.content?.contact_visit?.timingSubtitle}</p>
                    </div>
                  </div>

                  <div className="visit_item">
                    <FaPhoneAlt className="visit_icon" />
                    <div>
                      <h6>{details?.content?.contact_visit?.contactTitle}</h6>
                      <p>{details?.content?.contact_visit?.contactSubtitle}</p>
                    </div>
                  </div>
                </div>

                <Link to="https://www.google.com/maps/place/Shivah+Web+Tech+Private+Limited/@30.7120603,76.6950417,17z/data=!3m1!4b1!4m6!3m5!1s0x390feff7e0e2421f:0x1932dde5487c0b94!8m2!3d30.7120557!4d76.6976166!16s%2Fg%2F11v15z8030?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D" className="visit_btn">{details?.content?.contact_visit?.btn_text}</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMapSection;