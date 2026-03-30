import { useState } from "react";

function CategorySection({items, addToCart, setAddToCart}){

	{/*WishList Section */}
	
	  const [wishList , setWishList] = useState([]);
	
	  const wish = (id) => {
		  if(wishList.includes(id)){
			 setWishList(wishList.filter(items => items !== id))
		  } else {
			setWishList([...wishList,id]);
		  }
	  }

	  {/* Add to Cart*/}

	  const add_cart = (product) => {
	  const alreadyExist = addToCart.some((items) => items.id === product.id);

      if(alreadyExist){
        setAddToCart(addToCart.filter((items) => items.id !== product.id));
      } else{
        setAddToCart([...addToCart,product]);
      }
	  }
	
	return(
		
		<div className="category_block">	
			<div className="row">
			
				{items.map((props) => (
				
					<div className="col-lg-3 col-md-6 mb-3" key={props.id}>
						<div className="food_card p-3">
						
							<div className="food_img_box">
								<img src={props.image} alt={props.name} className="food_img" />
								<button className="food_badge" onClick={() => wish(props.id)}>{!wishList.includes(props.id) ? <i className="bi bi-heart"></i> : <i className="bi bi-heart-fill"></i>}</button>
							</div>
							
							<div className="food_card_body">
								 <h4 className="food_title">{props.name}</h4>
								 <p className="food_desc">{props.description}</p>
								 
								 <div className="food_card_bottom">
									<span className="food_price">₹{props.price}</span>
									<button className="food_add_btn" onClick={() => add_cart(props)}>{addToCart.some((items) => items.id === props.id) ? "Added": "Add"}</button>
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