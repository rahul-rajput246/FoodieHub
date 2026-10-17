import "../pages/About.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

function AboutStory({ details }) {
  const story = details?.content?.about_our_story || details?.content?.About_Our_Story || {};
  const imagePath = story?.image || details?.content?.About_Our_Story?.image || details?.content?.about_our_story?.image;

  return (
    <section className="about_story py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about_img_box">
              <img 
                src={`${API_BASE_URL}/storage/${imagePath}`} 
                alt="about"
                className="about_img"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="about_content">

              {story?.subtitle && (
                <span className="about_tag">{story.subtitle}</span>
              )}

              <h2>
                {story?.title || "Bringing Delicious Food To Your Doorstep"}
              </h2>

              {story?.desc1 && (
                <p>{story.desc1}</p>
              )}

              {story?.desc2 && (
                <p>{story.desc2}</p>
              )}

              <Link to={story?.btn_url || "/menu"} className="about_btn">
                {story?.btn_text || "Explore Menu"}
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutStory;