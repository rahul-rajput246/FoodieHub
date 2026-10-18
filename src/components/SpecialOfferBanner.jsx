import { Link } from "react-router-dom";
import { normalizeImageUrl } from "../config";

function SpecialOfferBanner({ details }) {
  const offer = details?.content?.home_specialOffer || details?.content?.specialOffer || {};

  const subtitle = offer.home_offer_subtitle || "Limited Time Offer";
  const title = offer.home_offer_title || "Get 30% Off On Your First Order";
  const desc = offer.home_offer_desc || "Enjoy your favorite meals at a discounted price. Fresh, delicious, and delivered right to your doorstep.";
  const btnText = offer.home_offer_btn_text || "Order Now";
  const btnUrl = offer.home_offer_btn_url || "/menu";

  const imgSrc = normalizeImageUrl(offer.image, "/assets/images/burger.png");

  return (
    <section className="special_banner_section py-5">
      <div className="container">
        <div className="special_banner_box">
          {/* Ambient background decorative elements */}
          <div className="offer_circle_bg offer_circle_1"></div>
          <div className="offer_circle_bg offer_circle_2"></div>

          <div className="row align-items-center position-relative">
            {/* Left Content */}
            <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
              <div className="left_box">
                <div className="offer_badge_wrapper">
                  <span className="special_offer_badge">
                    <span className="offer_badge_icon">🔥</span>
                    {subtitle}
                  </span>
                </div>

                <h2 className="special_offer_heading">{title}</h2>

                <p className="special_offer_desc">{desc}</p>

                {/* Offer Perks Row */}
                <div className="offer_perks_row">
                  <div className="offer_perk_item">
                    <span className="perk_icon">⚡</span>
                    <span>Fast Delivery</span>
                  </div>
                  <div className="offer_perk_item">
                    <span className="perk_icon">🥗</span>
                    <span>100% Fresh</span>
                  </div>
                  <div className="offer_perk_item">
                    <span className="perk_icon">🏷️</span>
                    <span>Best Price</span>
                  </div>
                </div>

                <div className="offer_action_box">
                  <Link to={btnUrl} className="special_offer_btn">
                    <span>{btnText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>

                  <Link to="/menu" className="offer_secondary_btn">
                    Explore Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="col-lg-5 col-md-12 text-center">
              <div className="right_box">
                <div className="offer_img_wrapper">
                  <div className="offer_img_backdrop"></div>
                  <img
                    src={imgSrc}
                    alt={title}
                    className="offer_img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/images/burger.png";
                    }}
                  />
                  <div className="offer_floating_badge">
                    <span className="badge_disc">SPECIAL</span>
                    <span className="badge_val">DEAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOfferBanner;