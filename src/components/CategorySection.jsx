function CategorySection({title, items}){
	
	return(
		
		<div className="category_block">
		
			<h3 className="mb-3">{title}</h3>
			
			<div className="row">
			
				{items.map((item) => (
				
					<div className="col-lg-3 col-md-6 mb-3" key={item.id}>
						<div className="food_card p-3">
						
							<div className="food_img_box">
								<img src={item.image} alt={item.name} className="food_img" />
								<span className="food_badge">⭐ {item.rating}</span>
							</div>
							
							<div className="food_card_body">
								 <h4 className="food_title">{item.name}</h4>
								 <p className="food_desc">{item.description}</p>
								 
								 <div className="food_card_bottom">
									<span className="food_price">₹{item.price}</span>
									<button className="food_add_btn">Add</button>
								</div>
							</div>
							
						</div>
					</div>
				
				))}
			
			</div>
		
		</div>
	
	);
	
}

export default CategorySection;