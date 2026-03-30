function WhytoChooseUs({title,subtitle,items}){
	return(
		
		<div className="container">
					
				<div className="why_to_heading_row pb-4">
					<h2>{title}</h2>
					<p>{subtitle}</p>
				</div>
				
			<div className="row g-4">
				
				{items.map((props) => (
				
					<div className="col-md-6 col-lg-3 col-12" key={props.id}>
						<div className="why_to_box">
							<div className="main_wh_to_icon_box">	
								<div className="why_to_icon_box">
									{props.icon}
								</div>
							</div>
							<div className="why_to_body_box">
								<h4>{props.heading}</h4>
								<p>{props.desc}</p>
							</div>
						</div>
					</div>
				
				))}
				
			</div>
		</div>
		
	);
}

export default WhytoChooseUs;