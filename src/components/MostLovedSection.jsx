import { useNavigate } from "react-router-dom";
import VegBadge from "./VegBadge";

function MostLovedSection({ items, add_cart, foodData, openCustomise }) {
  const navigate = useNavigate();

  const handleAction = (item) => {
    const isCustomisable =
      item.has_customizations ||
      (Array.isArray(item.variations) && item.variations.length > 0) ||
      (Array.isArray(item.addons) && item.addons.length > 0);

    if (isCustomisable && openCustomise) {
      openCustomise(item);
    } else {
      add_cart(item);
      navigate("/cart");
    }
  };

  return (
    <div className="most_loved_section py-3">
      <div className="container">
        <div className="most_loved_heading text-center pb-4">
          <span className="most_loved_tag">Customer Favorites</span>
          <h2>Most Loved Dishes</h2>
          <p>Discover the dishes our customers keep coming back for</p>
        </div>

        <div className="row g-4">
          {items.map((item) => {
            const isCustomisable =
              item.has_customizations ||
              (Array.isArray(item.variations) && item.variations.length > 0) ||
              (Array.isArray(item.addons) && item.addons.length > 0);

            return (
              <div className="col-md-6 col-lg-3" key={item.id}>
                <div className="most_loved_card h-100">
                  <div className="most_loved_img_box">
                    <img src={item.image_url} alt={item.food_name} className="most_loved_img" loading="lazy"/>  
                    <span className="most_loved_rating">⭐{item.food_rating}</span>
                  </div>

                  <div className="most_loved_body">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <VegBadge isVeg={item.is_veg} dietaryType={item.dietary_type} size="md" />
                      <h4 className="mb-0">{item.food_name}</h4>
                    </div>

                    <p>{item.food_subtitle}</p>

                    {isCustomisable && (
                      <div className="mb-2">
                        <span
                          className="customisable_chip"
                          role="button"
                          onClick={() => handleAction(item)}
                        >
                          <i className="bi bi-sliders"></i> Customisable
                        </span>
                      </div>
                    )}

                    <div className="most_loved_bottom">
                      <span className="most_loved_price">₹{item.food_price}</span>
                      <button
                        className="most_loved_btn"
                        onClick={() => handleAction(item)}
                      >
                        {isCustomisable ? "Customise" : "Order Now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MostLovedSection;