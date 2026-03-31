  import { useState } from "react";
  
  function About() {

    let initialValue = 10;
    const [counter,setCounter] = useState(initialValue);

    const addBtn = () =>{
      if(counter < 20){
        setCounter(counter + 1);
      } else {
        console.log("value going too much high please controll it now");
      }
    }

    const removeBtn = () =>{
      if(counter > 0){
        setCounter(counter - 1);
      } else {
        console.log("value going too much Low please controll it now");
      }
    }

    const reset = () => { 
      setCounter(initialValue);
    }

    {/* map practice function*/}

    const map_array = [
      
          {
            id:1,
            itemName:"Pizza",
            itemPrice:"200",
          },
          {
            id:2,
            itemName:"Burger",
            itemPrice:"300",
          },
          {
            id:3,
            itemName:"Fries",
            itemPrice:"400",
          },
          {
            id:4,
            itemName:"Momos",
            itemPrice:"500",
          },
          {
            id:5,
            itemName:"Rolls",
            itemPrice:"600",
          }
    ];

    const [activeDelete, setDelete] = useState(map_array);

    const delete_item = (sum) => {
       setDelete(activeDelete.filter((items) => items.id !== sum))
    }

    {/* Add To Cart With + and - */}

    const addToCart = [
       {
         id:1,
         price:200,
         name:"pizza",
       },
       {
         id:2,
         price:400,
         name:"Burger",
       },
       {
         id:3,
         price:2300,
         name:"Chicken fries",
       },
    ];

    const [cart,setCart] = useState([]);

   {/* Add to Cart */}
   
    const add_Btn = (id) => {
      
      const newItem = cart.find((item) => item.id === id);

      if(newItem){
         let newCart = cart.map((item) => 
            item.id === id ? {...item,qty: item.qty+1} : item
         );
         setCart(newCart);
      } else {
        setCart([...cart,{id:id , qty:1}]);
      }

    };

    {/* Increase quantity of items*/}

    const plusBtn = (id) => {
        let newCart = cart.map((item) => 
          item.id === id ? {...item,qty:item.qty + 1} : item
        );
        setCart(newCart);
    }

    {/* Decrease quantity of items */}

    const minusBtn = (id) => {
       let newCart = cart.find((item) => item.id === id);
       if(newCart.qty === 1){
          let newCart = cart.filter((item) => item.id !== id);
          setCart(newCart);
       } else{
        let newCart = cart.map((item) => 
            item.id === id ? {...item,qty:item.qty-1} : item
        );
          setCart(newCart);
       }
    }

    const totalQty = cart.reduce((total, item) => total + item.qty,0);
   
    return(
      <>
        <div className="main_box" style={{ height:"250px", width:"100%"}}></div>

        {/* Counter App */}

        <div className="counter_box">
            <h2 style={{textAlign:"center",width:"100%"}}>This Is A Counter App</h2>
            <p style={{textAlign:"center",width:"100%"}}>This Is Counter Dynamic Value {counter}</p>
            <div style={{textAlign:"center", display:"flex",justifyContent:"center",gap:"10px"}} className="button_row">  
              <button className="add" onClick={addBtn}>Add</button>
              <button className="remove" onClick={removeBtn}>Remove</button>
              <button className="reset_btn" onClick={reset}>Reset</button>
            </div>
        </div>

        <div className="map_box" style={{ justifyContent:"center",display:"flex",gap:"20px",marginTop:"30px"}}>
          {activeDelete.map((props) => (
            <div className="array_map_cards" key={props.id}>
              <h3>{props.itemName}</h3>
              <p>{props.itemPrice}</p>
              <button className="delete" onClick={() => delete_item(props.id)}>Delete</button>
            </div>
          ))}
        </div>

       <div className="addtocar_box">
          <div className="cart_icon_box">
            <i className="bi bi-cart">
                {totalQty > 0 &&
                  <span>{totalQt}</span>
                }
            </i>
          </div>
          <div className="container">
            {addToCart.map((jalwa) => {
              let cartItem = cart.find((c) => c.id === jalwa.id);
                return(
                    <div className="cart_box_id" key={jalwa.id}>
                       <h4>{jalwa.name} - {jalwa.price}</h4>
                       {cartItem ? (
                        <>
                          <button className="plus_btn" onClick={() => plusBtn(jalwa.id)}>+</button>
                          <span>{cartItem.qty}</span>
                          <button className="minus_btn" onClick={() => minusBtn(jalwa.id)}>-</button>
                       </>
                       ) : (
                           <button className="Add" onClick={() => add_Btn(jalwa.id)}>Add</button>
                       )};
                    </div>
                );
              })}
          </div>
       </div>

      </>
    );
    
  }

  export default About;