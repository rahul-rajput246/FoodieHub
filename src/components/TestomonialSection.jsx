import { normalizeImageUrl } from "../config";

const DEFAULT_AVATARS = [
  "/assets/images/our_team_img1.png",
  "/assets/images/our_team_img2.png",
  "/assets/images/our_team_img3.png",
];

function TestomonialSection({ details }) {
  const items = (details?.content?.home_testom?.items && details.content.home_testom.items.length > 0)
    ? details.content.home_testom.items
    : [
        { desc: "Absolutely loved the burger and fries. Delivery was super quick and food arrived hot.", rating: 5, name: "Rahul Rajput", emotion: "This is Great..!!", image: "/assets/images/our_team_img1.png" },
        { desc: "The pizza was cheesy, fresh, and full of flavor. One of the best online food experiences.", rating: 4, name: "Mohit Sharma", emotion: "Dishes is literally Awsome..!!", image: "/assets/images/our_team_img2.png" },
        { desc: "FoodieHub made my dinner so easy. Great taste, great service, and smooth ordering process", rating: 5, name: "Himanshu Singh", emotion: "Great taste ever i tasted..!!", image: "/assets/images/our_team_img3.png" }
      ];

  const subtitle = details?.content?.home_testom?.home_testi_subtitle || "Loved By Food Lovers";
  const title = details?.content?.home_testom?.home_testi_title || "What Our Customers Say";

  return (
    <div className="testomonial_section py-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <span className="testimonial_tag">{subtitle}</span>
            <h2 className="testimonial_title">{title}</h2>
          </div>
        </div>

        <div className="row">
          {items.map((props, index) => {
            const fallbackAvatar = DEFAULT_AVATARS[index % DEFAULT_AVATARS.length];
            return (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={props.id || index}>
                <div className="testomonial_box">
                  <div className="quote_icon">❝</div>

                  <p className="testimonial_review">{props.desc}</p>

                  <div className="testimonial_rating">
                    {"⭐".repeat(Number(props.rating) || 5)}
                  </div>

                  <div className="testimonial_user">
                    <div className="testimonial_img_box">
                      <img
                        src={normalizeImageUrl(props.image, fallbackAvatar)}
                        alt="User Image"
                        className="testimonial_img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = fallbackAvatar;
                        }}
                      />
                    </div>

                    <div className="testimonial_user_info">
                      <h4>{props.name}</h4>
                      <span>{props.emotion}</span>
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

export default TestomonialSection;