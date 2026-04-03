import { menuItems, allPrice, sortData } from "../data/Menudata";
import { useState, useMemo } from "react";
import { categories } from '../data/Homedata';
import '../pages/Menu.css';

function MenuFilter({ addToCart, add_cart, plus_cart, minus_cart,wishList,wish }) {

  {/* Category Filter */}
  
  const allCategories = [{id:0,title:"All"}, ...categories]
  
  const [activeCategory,setCategory] =  useState("All");

  const randomFood = useMemo(() => {
      return [...menuItems].sort(() => Math.random() - 0.5);
  }, []);

  const filterFood = activeCategory === "All" ? randomFood : menuItems.filter((item) => item.category === activeCategory);

 {/* Price Filter */}
 
  const [activePrice,setPrice] = useState("All Prices");

  const filterPrice = activePrice === "All Prices"
                      ? filterFood
                      : activePrice === "Under 200"
                      ? filterFood.filter((item) => item.price < 200)
                      : activePrice === "200 - 300"
                      ? filterFood.filter((item) => item.price >= 200 && item.price <= 300)
                      : filterFood.filter((item) => item.price > 300);

  {/* Sort By Filter */}

  const [sortBy,setSortBy] = useState("Sort By");

  const sortFilter = [...filterPrice].sort((a, b) => {
    if (sortBy === "Price Low To High") {
      return a.price - b.price;
    }

    if (sortBy === "Price: High To Low") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <section className="menu_page py-5">
      <div className="container">
        <div className="row g-4">

          <div className="col-lg-3">
            <div className="menu_filter_box p-4">
              <h4>Filter Menu</h4>

              <div className="mb-4">
                <label className="form-label">Search Food</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here..."
                />
              </div>

              <div className="mb-4">
                <div className="category_heading_box">
                  <h5>Categories</h5>
                </div>
                <div className="category_buttons">
                  {allCategories.map((props) => (
                      <button
                        key={props.id}
                        className={`menu_filter_btn ${activeCategory === props.title ? "active" : ""}`}
                        onClick={() => setCategory(props.title)}
                      >
                        {props.title}
                      </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="category_heading_box">
                  <h5>Price Range</h5>
                </div>
                <div className="category_buttons">
                  {allPrice.map((item) => (
                      <button 
                      key={item.id}
                      className={`menu_filter_btn ${activePrice === item.title ? "active" : ""}`}
                      onClick={() => setPrice(item.title)}
                      >
                          {item.title}
                      </button>
                   ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="category_heading_box">
                  <h5>Sort By</h5>
                </div>
                <div className="category_buttons">
                  <button className="menu_filter_btn">Price: Low to High</button>
                  <button className="menu_filter_btn">Price: High to Low</button>
                  <button className="menu_filter_btn">Rating: High to Low</button>
                </div>
              </div>

              <button className="menu_clear_btn">Clear Filters</button>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="menu_top_bar d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Our Delicious Menu</h4>
                <p className="mb-0">Showing {sortFilter.length} food items</p>
              </div>

              <select className="form-select menu_sort_select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortData.map((item) => 
                  <option key={item.id}>{item.title}</option>
                )}
              </select>
            </div>

            <div className="row">
              {sortFilter.map((item) => {
                const cartItem = addToCart.find((cart) => cart.id === item.id);

                return (
                  <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                    <div className="menu_food_card p-3 h-100">
                      <div className="menu_food_img_box">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="menu_food_img"
                        />
                        <button
                          className="food_badge"
                          onClick={() => wish(item.id)}
                        >
                          {!wishList.includes(item.id) ? (
                            <i className="bi bi-heart"></i>
                          ) : (
                            <i className="bi bi-heart-fill"></i>
                          )}
                  </button>
                      </div>

                      <div className="menu_food_card_body">
                        <span className="menu_food_category">{item.category}</span>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>

                        <div className="menu_food_card_bottom">
                          <strong className="menu_food_price">₹{item.price}</strong>

                          {cartItem ? (
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="menu_add_btn"
                                onClick={() => minus_cart(item.id)}
                              >
                                -
                              </button>

                              <span>{cartItem.qty}</span>

                              <button
                                className="menu_add_btn"
                                onClick={() => plus_cart(item.id)}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="menu_add_btn"
                              onClick={() => add_cart(item.id)}
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
        </div>
      </div>
    </section>
  );
}

export default MenuFilter;