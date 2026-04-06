import "../pages/About.css";
import { Link } from "react-router-dom";

function AboutStory() {
  return (
    <section className="about_story py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about_img_box">
              <img 
                src="/assets/images/about-story.png" 
                alt="about"
                className="about_img"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="about_content">

              <span className="about_tag">Our Story</span>

              <h2>
                Bringing Delicious Food <br />
                To Your Doorstep
              </h2>

              <p>
                FoodieHub started with a simple idea — to make delicious, 
                restaurant-quality food accessible to everyone. We believe 
                food is not just about taste, it's about experience.
              </p>

              <p>
                From fresh ingredients to fast delivery, our mission is to 
                serve happiness in every bite. Whether it's fast food or 
                traditional flavors, we’ve got something for everyone.
              </p>

              <Link to="/menu" className="about_btn">Explore Menu</Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutStory;