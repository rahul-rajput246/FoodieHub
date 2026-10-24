import "../pages/About.css";
import { Link } from "react-router-dom";
import { normalizeImageUrl } from "../config";

function AboutStory({ details }) {
  const story = {
    ...(details?.content?.About_Our_Story || {}),
    ...(details?.content?.about_our_story || {}),
  };
  const imagePath = story?.image || "/assets/images/about-story.jpg";

  const subtitle = story?.subtitle || "Our Story";
  const title = story?.title || "Bringing Delicious Food To Your Doorstep";
  const desc1 = story?.desc1 || "FoodieHub started with a simple idea — to make delicious, restaurant-quality food accessible to everyone. We believe food is not just about taste, it's about experience.";
  const desc2 = story?.desc2 || "From fresh ingredients to fast delivery, our mission is to serve happiness in every bite. Whether it's fast food or traditional flavors, we've got something for everyone.";
  const btnText = story?.btn_text || "Explore Menu";
  const btnUrl = story?.btn_url || "/menu";

  return (
    <section className="about_story py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about_img_box">
              <img 
                src={normalizeImageUrl(imagePath, "/assets/images/about-story.jpg")} 
                alt="about"
                className="about_img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/assets/images/about-story.jpg";
                }}
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="about_content">

              {subtitle && (
                <span className="about_tag">{subtitle}</span>
              )}

              <h2>
                {title}
              </h2>

              {desc1 && (
                <p>{desc1}</p>
              )}

              {desc2 && (
                <p>{desc2}</p>
              )}

              <Link to={btnUrl} className="about_btn">
                {btnText}
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutStory;