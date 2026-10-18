import "../pages/About.css";
import { normalizeImageUrl } from "../config";

function Specialities({details}) {
  const items = details?.content?.about_special?.items || [];

  return (
    <section className="specialities_section py-5">
      <div className="container">
        <div className="specialities_heading text-center mb-5">
          <span className="specialities_tag">{details?.content?.about_special?.subtitle}</span>
          <h2>{details?.content?.about_special?.title}</h2>
          <p>
            {details?.content?.about_special?.desc}
          </p>
        </div>

        <div className="row g-4">
          {items.map((item , index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="speciality_card h-100">
                <div className="speciality_img_box">
                  <img
                    src={normalizeImageUrl(item.image, "/assets/images/our_team_img1.png")}
                    alt={item.title}
                    className="speciality_img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/assets/images/our_team_img1.png";
                    }}
                  />
                </div>

                <div className="speciality_card_body">
                  <h4>{item.box_title}</h4>
                  <p>{item.box_desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specialities;