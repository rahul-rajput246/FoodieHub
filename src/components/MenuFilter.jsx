import { allPrice, sortData, ratingData, typeDishData } from "../data/Menudata";
import { useState, useMemo } from "react";
import VegBadge from "./VegBadge";
import '../pages/Menu.css';

function MenuFilter({ addToCart, add_cart, plus_cart, minus_cart, wishList, addToWishlist, removeFromWishlist, foods, openCustomise }) {

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

  /* Dietary Filter (All / Pure Veg / Non-Veg) */
  const [dietaryFilter, setDietaryFilter] = useState("all");

  const filterDietary =
    dietaryFilter === "all"
      ? searchFilter
      : dietaryFilter === "veg"
        ? searchFilter.filter(
            (item) =>
              item.is_veg === true ||
              item.is_veg === 1 ||
              item.is_veg === "1" ||
              item.dietary_type === "veg"
          )
        : searchFilter.filter(
            (item) =>
              item.is_veg === false ||
              item.is_veg === 0 ||
              item.is_veg === "0" ||
              item.dietary_type === "non_veg"
          );

  /* Price Filter */
  const [activePrice, setPrice] = useState("All Prices");

  const filterPrice =
    activePrice === "All Prices"
      ? filterDietary
      : activePrice === "Under 200"
        ? filterDietary.filter((item) => Number(item.food_price) < 200)
        : activePrice === "200 - 300"
          ? filterDietary.filter((item) => Number(item.food_price) >= 200 && Number(item.food_price) <= 300)
          : filterDietary.filter((item) => Number(item.food_price) > 300);


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
    setDietaryFilter("all");
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

              {/* Dietary Preference Filter */}
              <div className="mb-4">
                <div className="category_heading_box">
                  <h5>Dietary Preference</h5>
                </div>
                <div className="category_buttons">
                  <button
                    className={`menu_filter_btn d-flex align-items-center justify-content-between ${dietaryFilter === "all" ? "active" : ""}`}
                    onClick={() => setDietaryFilter("all")}
                  >
                    <span>All Dishes</span>
                    <span className="badge bg-light text-dark rounded-pill">All</span>
                  </button>

                  <button
                    className={`menu_filter_btn d-flex align-items-center justify-content-between ${dietaryFilter === "veg" ? "active" : ""}`}
                    onClick={() => setDietaryFilter("veg")}
                  >
                    <span className="d-inline-flex align-items-center gap-2">
                      <VegBadge isVeg={true} size="sm" /> Pure Veg
                    </span>
                    <span className="badge bg-success bg-opacity-25 text-success rounded-pill">Veg</span>
                  </button>

                  <button
                    className={`menu_filter_btn d-flex align-items-center justify-content-between ${dietaryFilter === "non_veg" ? "active" : ""}`}
                    onClick={() => setDietaryFilter("non_veg")}
                  >
                    <span className="d-inline-flex align-items-center gap-2">
                      <VegBadge isVeg={false} size="sm" /> Non-Veg
                    </span>
                    <span className="badge bg-danger bg-opacity-25 text-danger rounded-pill">Non-Veg</span>
                  </button>
                </div>
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
            <div className="menu_top_bar d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <h4 className="mb-1">Our Delicious Menu</h4>
                <p className="mb-0 text-muted">Showing {sortFilter.length} food items</p>
              </div>

              <div className="d-flex align-items-center gap-3">
                {/* Quick Veg Only Switch */}
                <div className="veg_only_switch_container d-flex align-items-center gap-2">
                  <label className="veg_toggle_switch" title="Toggle Pure Veg Dishes">
                    <input
                      type="checkbox"
                      checked={dietaryFilter === "veg"}
                      onChange={(e) => setDietaryFilter(e.target.checked ? "veg" : "all")}
                    />
                    <span className="veg_toggle_slider"></span>
                  </label>
                  <span
                    className="veg_toggle_label d-flex align-items-center gap-1"
                    onClick={() => setDietaryFilter(dietaryFilter === "veg" ? "all" : "veg")}
                  >
                    <VegBadge isVeg={true} size="sm" /> Veg Only
                  </span>
                </div>

                <select className="form-select menu_sort_select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {sortData.map((item) =>
                    <option key={item.id}>{item.title}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="row">
              {sortFilter.map((item) => {
                const cartItem = addToCart.find((cart) => cart.id === item.id);
                const isCustomisable =
                  item.has_customizations ||
                  (Array.isArray(item.variations) && item.variations.length > 0) ||
                  (Array.isArray(item.addons) && item.addons.length > 0);

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
                          onClick={() => {
                            if (wishList.includes(item.id)) {
                              removeFromWishlist(item.id);
                            } else {
                              addToWishlist(item.id);
                            }
                          }}
                        >
                          {!wishList.includes(item.id) ? (
                            <i className="bi bi-heart"></i>
                          ) : (
                            <i className="bi bi-heart-fill"></i>
                          )}
                        </button>
                      </div>

                      <div className="menu_food_card_body">
                        <div className="category_badge_box mb-2">
                          <span className="menu_food_category">{item.category_name}</span>
                          <span className="rating">⭐{item.food_rating}</span>
                        </div>

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
                              onClick={() => openCustomise ? openCustomise(item) : add_cart(item)}
                            >
                              <i className="bi bi-sliders"></i> Customisable
                            </span>
                          </div>
                        )}

                        <div className="menu_food_card_bottom">
                          <strong className="menu_food_price">₹{item.food_price}</strong>

                          {isCustomisable ? (
                            <button
                              className="menu_add_btn"
                              onClick={() => openCustomise ? openCustomise(item) : add_cart(item)}
                              title="Customise this item"
                            >
                              {cartItem ? `Add (${cartItem.qty}) +` : "Add +"}
                            </button>
                          ) : cartItem ? (
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
                              onClick={() => add_cart(item)}
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