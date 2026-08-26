function TestomonialSection({ details }) {
  return (
    <div className="testomonial_section py-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <span className="testimonial_tag">{details?.content?.home_testom?.home_testi_subtitle}</span>
            <h2 className="testimonial_title">{details?.content?.home_testom?.home_testi_title}</h2>
            {/* <p className="testimonial_subtitle">{details?.content?.home_testom?.home_testi_title}</p> */}
          </div>
        </div>

        <div className="row">
          {details?.content?.home_testom?.items?.map((props) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={props.id}>
              <div className="testomonial_box">
                <div className="quote_icon">❝</div>

                <p className="testimonial_review">{props.desc}</p>

                <div className="testimonial_rating">
                  {"⭐".repeat(props.rating)}
                </div>

                <div className="testimonial_user">
                  <div className="testimonial_img_box">
                    <img
                      src={`http://127.0.0.1:8000/storage/${props.image}`}
                      alt="User Image"
                      className="testimonial_img"
                      loading="lazy"
                    />
                  </div>

                  <div className="testimonial_user_info">
                    <h4>{props.name}</h4>
                    <span>{props.emotion}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestomonialSection;