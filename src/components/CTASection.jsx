import "../pages/About.css";
import { Link } from "react-router-dom";

function CTASection({details}) {
  const offer = details?.content?.aboutOffer || details?.content?.about_offer || {};

  return (
    <section className="cta_section py-5">
      <div className="container">
        <div className="cta_box">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta_content">
                {offer.subtitle && <span className="cta_tag">{offer.subtitle}</span>}
                <h2>{offer.title || "Ready To Order?"}</h2>
                <p>
                  {offer.desc}
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cta_btn_box">
                <Link to={offer.btn_url1 || "/cart"} className="cta_btn primary_btn">
                  {offer.btn_text1 || "Order Now"}
                </Link>
                <Link to={offer.btn_url2 || "/menu"} className="cta_btn secondary_btn">
                  {offer.btn_text2 || "Explore Menu"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;