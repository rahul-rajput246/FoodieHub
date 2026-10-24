import "../pages/About.css";
import { normalizeImageUrl } from "../config";

const DEFAULT_SPECIALITY_IMAGES = [
  "/assets/images/burger.png",
  "/assets/images/chole_bhature.jfif",
  "/assets/images/mojito.jfif",
  "/assets/images/blackForest_cake.webp",
];

function Specialities({details}) {
  const items = (details?.content?.about_special?.items && details.content.about_special.items.length > 0)
    ? details.content.about_special.items
    : [
        { box_title: "Fast Food", box_desc: "Crispy, cheesy, and loaded with flavor — perfect for your quick cravings.", image: "/assets/images/burger.png" },
        { box_title: "Desi Tadka", box_desc: "Authentic Indian flavors made with rich spices and homely love.", image: "/assets/images/chole_bhature.jfif" },
        { box_title: "Chill Drinks", box_desc: "Refreshing beverages and cool sips to complete every meal.", image: "/assets/images/mojito.jfif" },
        { box_title: "Sweet Cravings", box_desc: "Delightful desserts and sweets that make every ending perfect.", image: "/assets/images/blackForest_cake.webp" }
      ];

  const subtitle = details?.content?.about_special?.subtitle || "What We Serve";
  const title = details?.content?.about_special?.title || "Our Specialities";
  const desc = details?.content?.about_special?.desc || "From spicy desi meals to sweet desserts, FoodieHub brings all your favorite flavors together in one place.";

  return (
    <section className="specialities_section py-5">
      <div className="container">
        <div className="specialities_heading text-center mb-5">
          <span className="specialities_tag">{subtitle}</span>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>

        <div className="row g-4">
          {items.map((item , index) => {
            const fallbackImg = DEFAULT_SPECIALITY_IMAGES[index % DEFAULT_SPECIALITY_IMAGES.length];
            return (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="speciality_card h-100">
                  <div className="speciality_img_box">
                    <img
                      src={normalizeImageUrl(item.image, fallbackImg)}
                      alt={item.box_title || "Speciality"}
                      className="speciality_img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg;
                      }}
                    />
                  </div>

                  <div className="speciality_card_body">
                    <h4>{item.box_title}</h4>
                    <p>{item.box_desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Specialities;