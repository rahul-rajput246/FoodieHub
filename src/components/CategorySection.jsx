import VegBadge from "./VegBadge";
import { normalizeImageUrl } from "../config";

function CategorySection({ items, addToCart, add_cart, plus_cart, minus_cart, wishList, removeFromWishlist, addToWishlist, foods, openCustomise }) {

  return (
    <div className="category_block">
      <div className="row">
        {items.map((props, index) => {
          const cartItem = addToCart.find((c) => c.id === props.id);
          const isCustomisable =
            props.has_customizations ||
            (Array.isArray(props.variations) && props.variations.length > 0) ||
            (Array.isArray(props.addons) && props.addons.length > 0);

          return (
            <div className="col-lg-3 col-md-6 mb-3" key={props.id}>
              <div className="food_card p-3">
                <div className="food_img_box">
                  <img
                    src={normalizeImageUrl(props.image_url)}
                    alt={props.food_name}
                    className="food_img"
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/assets/images/burger.png";
                    }}
                  />

                  <button
                    className="food_badge"
                    onClick={() => {
                      if (wishList.includes(props.id)) {
                        removeFromWishlist(props.id);
                      } else {
                        addToWishlist(props.id);
                      }
                    }}
                  >
                    {!wishList.includes(props.id) ? (
                      <i className="bi bi-heart"></i>
                    ) : (
                      <i className="bi bi-heart-fill"></i>
                    )}
                  </button>
                </div>

                <div className="food_card_body">
                  <div className="category_badge_box align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <VegBadge isVeg={props.is_veg} dietaryType={props.dietary_type} size="md" />
                      <h4 className="food_title mb-0">{props.food_name}</h4>
                    </div>
                    <span className="rating">⭐{props.food_rating}</span>
                  </div>

                  <p className="food_desc">{props.food_subtitle}</p>

                  {isCustomisable && (
                    <div className="mb-2">
                      <span
                        className="customisable_chip"
                        role="button"
                        onClick={() => openCustomise ? openCustomise(props) : add_cart(props)}
                      >
                        <i className="bi bi-sliders"></i> Customisable
                      </span>
                    </div>
                  )}

                  <div className="food_card_bottom">
                    <span className="food_price">₹{props.food_price}</span>

                    {isCustomisable ? (
                      <button
                        className="food_add_btn"
                        onClick={() => openCustomise ? openCustomise(props) : add_cart(props)}
                        title="Customise this dish"
                      >
                        {cartItem ? `Add (${cartItem.qty}) +` : "Add +"}
                      </button>
                    ) : cartItem ? (
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="food_add_btn"
                          onClick={() => minus_cart(props.id)}
                        >
                          -
                        </button>

                        <span>{cartItem.qty}</span>

                        <button
                          className="food_add_btn"
                          onClick={() => plus_cart(props.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="food_add_btn"
                        onClick={() => add_cart(props)}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySection;