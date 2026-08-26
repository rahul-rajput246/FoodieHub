  import { Link } from "react-router-dom";
  import { FaUtensils, FaKitchenSet, FaMotorcycle } from "react-icons/fa6";

  const iconMap = {
    Choose: <FaUtensils />,
    Fresh: <FaKitchenSet />,
    fastDelivery: <FaMotorcycle />,
  };

  function HowItWorks({details}) {
    return (
      <section className="how_it_works_section py-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="how_it_works_heading text-center pb-4">
                <span className="how_it_works_tag">{details?.content?.home_hiw?.home_hiw_subtitle}</span>
                <h2>{details?.content?.home_hiw?.home_hiw_title}</h2>
                <p>
                  {details?.content?.home_hiw?.home_hiw_desc}
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {details?.content?.home_hiw?.items?.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <div className="how_it_works_card">
                  <span className="step_number">{item.step}</span>

                  <div className="how_it_works_icon_wrap">
                    <div className="how_it_works_icon">
                      {iconMap[item.icon]}
                    </div>
                  </div>

                  <div className="how_it_works_line"></div>

                  <div className="how_it_works_body">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12">
              <div className="how_it_works_btn_box text-center pt-4">
                <Link to="/menu" className="how_it_works_btn">
                  {details?.content?.home_hiw?.home_hiw_btn_text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default HowItWorks;