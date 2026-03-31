  import { Link } from "react-router-dom";
  import { steps } from "../data/Homedata";


  function HowItWorks() {
    return (
      <section className="how_it_works_section py-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="how_it_works_heading text-center pb-4">
                <span className="how_it_works_tag">Simple Process</span>
                <h2>How It Works</h2>
                <p>
                  From selecting your favorite dishes to fast doorstep delivery,
                  FoodieHub makes ordering food simple, quick, and satisfying.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {steps.map((item) => (
              <div className="col-lg-4 col-md-6 col-12" key={item.id}>
                <div className="how_it_works_card">
                  <span className="step_number">{item.step}</span>

                  <div className="how_it_works_icon_wrap">
                    <div className="how_it_works_icon">
                      {item.icon}
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
                  Explore Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default HowItWorks;