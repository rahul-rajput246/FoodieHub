import { Link } from "react-router-dom";

function SpecialOfferBanner() {
  return (
    <div className="special_banner_section py-5">
      <div className="container">
        <div className="special_banner_box">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6">
              <div className="left_box">
                
                <span className="offer_badge">Limited Time Offer</span>

                <h2 className="offer_heading">
                  Get 30% Off On Your First Order
                </h2>

                <p className="offer_desc">
                  Enjoy your favorite meals at a discounted price. Fresh,
                  delicious, and delivered right to your doorstep.
                </p>

                <Link to="/menu" className="offer_btn">
                  Order Now
                </Link>

              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <div className="right_box">
                <img
                  src="assets/images/burger.png"
                  alt="offer"
                  className="offer_img"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOfferBanner;