function TestomonialSection({ title, subtitle, items }) {
  return (
    <div className="testomonial_section py-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <span className="testimonial_tag">Testimonials</span>
            <h2 className="testimonial_title">{title}</h2>
            <p className="testimonial_subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="row">
          {items.map((props) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={props.id}>
              <div className="testomonial_box">
                <div className="quote_icon">❝</div>

                <p className="testimonial_review">{props.review}</p>

                <div className="testimonial_rating">
                  {"⭐".repeat(props.rating)}
                </div>

                <div className="testimonial_user">
                  <div className="testimonial_img_box">
                    <img
                      src={props.image}
                      alt={props.testimonialName}
                      className="testimonial_img"
                    />
                  </div>

                  <div className="testimonial_user_info">
                    <h4>{props.testimonialName}</h4>
                    <span>Happy Customer</span>
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