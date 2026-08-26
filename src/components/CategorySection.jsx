function CategorySection({ items, addToCart, add_cart, plus_cart, minus_cart, wishList, removeFromWishlist, addToWishlist, foods }) {

  return (
    <div className="category_block">
      <div className="row">
        {items.map((props) => {
          const cartItem = addToCart.find((c) => c.id === props.id);

          return (
            <div className="col-lg-3 col-md-6 mb-3" key={props.id}>
              <div className="food_card p-3">
                <div className="food_img_box">
                  <img src={props.image_url} alt={props.food_name} className="food_img" loading="lazy"/>

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
                  <div className="category_badge_box">
                    <h4 className="food_title">{props.food_name}</h4>
                    <span className="rating">⭐{props.food_rating}</span>
                  </div>
                  <p className="food_desc">{props.food_subtitle}</p>

                  <div className="food_card_bottom">
                    <span className="food_price">₹{props.food_price}</span>

                    {cartItem ? (
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
                        onClick={() => add_cart(props.id)}
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