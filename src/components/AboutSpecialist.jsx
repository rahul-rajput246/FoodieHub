import {SpecialitiesData} from "../data/Aboutdata";
function Specialities() {
  return (
    <section className="specialities_section py-5">
      <div className="container">
        <div className="specialities_heading text-center mb-5">
          <span className="specialities_tag">What We Serve</span>
          <h2>Our Specialities</h2>
          <p>
            From spicy desi meals to sweet desserts, FoodieHub brings all your
            favorite flavors together in one place.
          </p>
        </div>

        <div className="row g-4">
          {SpecialitiesData.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.id}>
              <div className="speciality_card h-100">
                <div className="speciality_img_box">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="speciality_img"
                  />
                </div>

                <div className="speciality_card_body">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
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