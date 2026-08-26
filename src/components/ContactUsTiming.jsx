import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
const iconMap = {
    location: <FaMapMarkerAlt />,
    contact: <FaPhoneAlt />,
    email: <FaEnvelope />,
    timing: <FaClock />,
};
function ContactInfoCards({ details }) {
  return (
    <section className="contact_info py-5 bg-#fffaf4" id="contact-form">
      <div className="container">
        <div className="row g-4">
          {details?.content?.contact_info?.items?.map((item, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="contact_card text-center p-4">
                <div className="icon_box">{iconMap[item.icon]}</div>
                <h5>{item.title}</h5>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactInfoCards;