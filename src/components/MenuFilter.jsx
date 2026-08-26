import { allPrice, sortData, ratingData, typeDishData } from "../data/Menudata";
import { useState, useMemo } from "react";
import '../pages/Menu.css';

function MenuFilter({ addToCart, add_cart, plus_cart, minus_cart, wishList, addToWishlist, foods }) {

  {/* Category Filter */ }

  const allCategories = useMemo(() => {
    const uniqueCategory = [...new Set(foods.map((items) => items.category_name).filter(Boolean))];
    return ["All", ...uniqueCategory];
  }, [foods]);

  const [activeCategory, setCategory] = useState("All");

  const randomFood = useMemo(() => {
    return [...foods].sort(() => Math.random() - 0.5);
  }, [foods]);

  /* Category Filter */

  const filterFood =
    activeCategory === "All"
      ? randomFood
      : randomFood.filter((item) => item.category_name === activeCategory);

  /* Search Filter */
  const [search, setSearch] = useState("");

  const searchFilter =
    search.trim() === ""
      ? filterFood
      : filterFood.filter((item) =>
        item.food_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.category_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.food_desc?.toLowerCase().includes(search.toLowerCase())
      );

  /* Price Filter */
  const [activePrice, setPrice] = useState("All Prices");

  const filterPrice =
    activePrice === "All Prices"
      ? searchFilter
      : activePrice === "Under 200"
        ? searchFilter.filter((item) => Number(item.food_price) < 200)
        : activePrice === "200 - 300"
          ? searchFilter.filter((item) => Number(item.food_price) >= 200 && Number(item.food_price) <= 300)
          : searchFilter.filter((item) => Number(item.food_price) > 300);


  /* Types Of Dishes Filter */

  const [activeType, setActiveType] = useState("All");

  const typesFilter =
    activeType === "All"
      ? filterPrice
      : filterPrice.filter((item) => item.food_type === activeType);


  /* Ratings Filter */

  const [activeRating, setRating] = useState("All");

  const filterRating =
    activeRating === "All"
      ? typesFilter
      : activeRating === "Above 4.5"
        ? typesFilter.filter((item) => Number(item.food_rating) >= 4.5)
        : activeRating === "Above 4"
          ? typesFilter.filter((item) => Number(item.food_rating) >= 4)
          : typesFilter.filter((item) => Number(item.food_rating) >= 3.5);

  const clearFilters = () => {
    setCategory("All");
    setActiveType("All");
    setSearch("");
    setPrice("All Prices");
    setRating("All");
    setSortBy("Sort By");
  };

  /* Sort By Filter */
  const [sortBy, setSortBy] = useState("Sort By");

  const sortFilter = [...filterRating].sort((a, b) => {

    if (sortBy === "Price Low To High") {
      return Number(a.food_price) - Number(b.food_price)
    }

    if (sortBy === "Price: High To Low") {
      return Number(b.food_price) - Number(a.food_price);
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <div className="category_heading_box">
                  <h5>Categories</h5>
                </div>
                <div className="category_buttons">
                  {allCategories.map((category, index) => (
                    <button
                      key={index}
                      className={`menu_filter_btn ${activeCategory === category ? "active" : ""}`}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="category_heading_box">
                  <h5>Types of Dishes</h5>
                </div>
                <div className="category_buttons">
                  {typeDishData.map((item) => (
                    <button
                      key={item.id}
                      className={`menu_filter_btn ${activeType === item.title ? "active" : ""}`}
                      onClick={() => setActiveType(item.title)}
                    >
                      {item.title}
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
                  <h5>Ratings</h5>
                </div>
                <div className="category_buttons">
                  {ratingData.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setRating(item.title)}
                      className={`menu_filter_btn ${activeRating === item.title ? "active" : ""}`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <button className="menu_clear_btn" onClick={clearFilters}>Clear Filters</button>
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
                          src={item.image_url}
                          alt={item.food_name}
                          className="menu_food_img"
                          loading="lazy"
                        />
                        <button
                          className="food_badge"
                          onClick={() => addToWishlist(item.id)}
                        >
                          {!wishList.includes(item.id) ? (
                            <i className="bi bi-heart"></i>
                          ) : (
                            <i className="bi bi-heart-fill"></i>
                          )}
                        </button>
                      </div>

                      <div className="menu_food_card_body">
                        <div className="category_badge_box">
                          <span className="menu_food_category">{item.category_name}</span>
                          <span className="rating">⭐{item.food_rating}</span>
                        </div>
                        <h4>{item.food_name}</h4>
                        <p>{item.food_subtitle}</p>

                        <div className="menu_food_card_bottom">
                          <strong className="menu_food_price">₹{item.food_price}</strong>

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