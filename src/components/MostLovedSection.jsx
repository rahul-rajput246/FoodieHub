import { useNavigate } from "react-router-dom";

function MostLovedSection({ items, add_cart,foodData }) {
  const navigate = useNavigate();

  const orderNow = (id) => {
    add_cart(id);
    navigate("/cart");
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
          {items.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.id}>
              <div className="most_loved_card h-100">
                <div className="most_loved_img_box">
                  <img src={item.image_url} alt={item.food_name} className="most_loved_img" loading="lazy"/>  
                  <span className="most_loved_rating">⭐{item.food_rating}</span>
                </div>

                <div className="most_loved_body">
                  <h4>{item.food_name}</h4>
                  <p>{item.food_subtitle}</p>

                  <div className="most_loved_bottom">
                    <span className="most_loved_price">₹{item.food_price}</span>
                    <button
                      className="most_loved_btn"
                      onClick={() => orderNow(item.id)}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MostLovedSection;