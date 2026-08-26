import { FaTruck, FaLeaf , FaPaypal } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";

const iconMap = {
  Delivery: <FaTruck />,
  Fresh: <FaLeaf />,	
  Payment: <FaPaypal />,
  ExpertChefs: <GiChefToque  />,
};

function WhytoChooseUs({details}){
	return(
		
		<div className="why_to_choose_secton pb-5">
		<div className="container">
					
				<div className="why_to_heading_row pb-4">
					<h2>{details?.content?.home_wcu?.home_wcu_title}</h2>
					<p>{details?.content?.home_wcu?.home_wcu_subtitle}</p>
				</div>
				
			<div className="row g-4">
				
				{details?.content?.home_wcu?.items?.map((item,index) => (
				
					<div className="col-md-6 col-lg-3 col-12" key={index}>
						<div className="why_to_box">
							<div className="main_wh_to_icon_box">	
								<div className="why_to_icon_box">
									{iconMap[item.icon]}
								</div>
							</div>
							<div className="why_to_body_box">
								<h4>{item.title}</h4>
								<p>{item.desc}</p>
							</div>
						</div>
					</div>
				
				))}
				
			</div>
			</div>
		</div>
		
	);
}

export default WhytoChooseUs;