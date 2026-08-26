import "../pages/About.css";
import { Link } from "react-router-dom";

function AboutStory({ details }) {

  return (
    <section className="about_story py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT IMAGE */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="about_img_box">
              <img 
                src={`http://127.0.0.1:8000/storage/${details?.content?.about_our_story?.image}`} 
                alt="about"
                className="about_img"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div className="about_content">

              <span className="about_tag">{details?.content?.About_Our_Story?.subtitle}</span>

              <h2>
                {details?.content?.About_Our_Story?.title}
              </h2>

              <p>
                 {details?.content?.About_Our_Story?.desc1}
              </p>

              <p>
               {details?.content?.About_Our_Story?.desc2}
              </p>

              <Link to="/menu" className="about_btn">{details?.content?.About_Our_Story?.btn_text}</Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutStory;