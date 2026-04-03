import { useState } from "react";

function CategorySection({ items, addToCart, add_cart, plus_cart, minus_cart }) {
  const [wishList, setWishList] = useState([]);

  const wish = (id) => {
    if (wishList.includes(id)) {
      setWishList(wishList.filter((item) => item !== id));
    } else {
      setWishList([...wishList, id]);
    }
  };

  return (
    <div className="category_block">
      <div className="row">
        {items.map((props) => {
          const cartItem = addToCart.find((c) => c.id === props.id);

          return (
            <div className="col-lg-3 col-md-6 mb-3" key={props.id}>
              <div className="food_card p-3">
                <div className="food_img_box">
                  <img src={props.image} alt={props.name} className="food_img" />

                  <button
                    className="food_badge"
                    onClick={() => wish(props.id)}
                  >
                    {!wishList.includes(props.id) ? (
                      <i className="bi bi-heart"></i>
                    ) : (
                      <i className="bi bi-heart-fill"></i>
                    )}
                  </button>
                </div>

                <div className="food_card_body">
                  <h4 className="food_title">{props.name}</h4>
                  <p className="food_desc">{props.description}</p>

                  <div className="food_card_bottom">
                    <span className="food_price">₹{props.price}</span>

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