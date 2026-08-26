import { Link } from "react-router-dom";

function CTASection({details}) {
  return (
    <section className="cta_section py-5">
      <div className="container">
        <div className="cta_box">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta_content">
                <span className="cta_tag">{details?.content?.aboutOffer?.subtitle}</span>
                <h2>{details?.content?.aboutOffer?.title}</h2>
                <p>
                  {details?.content?.aboutOffer?.desc}
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cta_btn_box">
                <Link to="/menu" className="cta_btn primary_btn">
                  {details?.content?.aboutOffer?.btn_text1}
                </Link>
                <Link to="/menu" className="cta_btn secondary_btn">
                 {details?.content?.aboutOffer?.btn_text2}
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