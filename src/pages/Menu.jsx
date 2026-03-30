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

    const [cart,setCart] = useState([]);

    const cart_btn = (products) => {
       
      const exits = cart.some((items) => items.id === products.id);
       if(exits){
          setCart(cart.filter((items) => items.id !== products.id));
       } else {
          setCart([...cart,products]);
       }

    }

    const [add_counter,setAdd_counter] = useState(0);
   
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

        <div className="add_cart_box" style={{display:"flex",justifyContent:"center", gap:"30px"}}>
            <div className="cart_box">
                <h4 style={{textAlign:"center",width:"100%",marginTop:"20px"}}>Cart</h4>
            </div>
              {map_array.map((items) => (
                    <div className="hello" key={items.id}>
                        <div className="cart_btn_box">
                        <h3>{items.itemName}</h3>
                          <button onClick={() => setAdd_counter(add_counter + 1)}>+</button>
                          <button className="cart_btn" onClick={() => cart_btn(items)}>
                            {cart.some((i) => i.id === items.id) ? "Remove" : "Add"}
                          </button>
                          <button>{add_counter}</button>
                          <button onClick={() => setAdd_counter(add_counter - 1)}>-</button>
                        </div>
                    </div>
                
              ))}
              <div className="cart_body">
                
              </div>

        </div>

      </>
    );
    
  }

  export default About;