function MostLovedSection({ title, subtitle, items }) {
  return (
    <div className="most_loved_section py-3">
		<div className="container">
			<div className="most_loved_heading text-center pb-4">
			  <span className="most_loved_tag">Customer Favorites</span>
			  <h2>{title}</h2>
			  <p>{subtitle}</p>
			</div>

			<div className="row g-4">
				{items.map((item) => (
					<div className="col-md-6 col-lg-3" key={item.id}>
					  <div className="most_loved_card h-100">
						<div className="most_loved_img_box">
						  <img src={item.image} alt={item.name} className="most_loved_img" />
						  <span className="most_loved_rating">⭐{item.rating}</span>
						</div>

						<div className="most_loved_body">
						  <h4>{item.name}</h4>
						  <p>{item.description}</p>

						  <div className="most_loved_bottom">
							<span className="most_loved_price">₹{item.price}</span>
							<button className="most_loved_btn">Order Now</button>
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

export default MostLovedSection;