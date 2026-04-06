import {contactData} from "../data/ContactUsdata";
function ContactInfoCards() {
  return (
    <section className="contact_info py-5 bg-#fffaf4">
      <div className="container">
        <div className="row g-4">
          {contactData.map((item, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="contact_card text-center p-4">
                <div className="icon_box">{item.icon}</div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactInfoCards;