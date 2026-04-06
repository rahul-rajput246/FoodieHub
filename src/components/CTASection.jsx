import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="cta_section py-5">
      <div className="container">
        <div className="cta_box">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta_content">
                <span className="cta_tag">Ready To Order?</span>
                <h2>Hungry? Let's Make Your Day Delicious</h2>
                <p>
                  Fresh flavors, quick delivery, and your favorite dishes are
                  waiting for you. Order now and enjoy the FoodieHub experience.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cta_btn_box">
                <Link to="/menu" className="cta_btn primary_btn">
                  Order Now
                </Link>
                <Link to="/menu" className="cta_btn secondary_btn">
                  Explore Menu
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