import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const {getTotalCartAmount,token, food_list, cartItems,url} =useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  
  const onchangehandle = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data =>({...data,[name]:value}))
  }


  const placeorder = async(e)=>{
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = {...item};
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }

    let response = await axios.post("http://localhost:5000/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      
      alert("order placed");
    }
    
    else{
      alert("error")
      
    }

  }

  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }

    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token])

  

  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <div>
      <form className='place-order' onSubmit={placeorder}>
        <div className="place-order-left">
          <p className='title'>Delivary Information</p>
            <div className="multi-fields">
              <input required  type="text" placeholder='First Name' name='firstName' value={data.firstName} onChange={onchangehandle} />
              <input required type="text " placeholder='Last Name' name='lastName' value={data.lastName} onChange={onchangehandle}/>
            </div>
            <input required type="email" placeholder='Enter email' name='email' value={data.email} onChange={onchangehandle}/>
            <input required type="text" placeholder='Street' name='street' value={data.street} onChange={onchangehandle}/>
            <div className="multi-fields">
              <input required type="text" placeholder='City' name='city' value={data.city} onChange={onchangehandle}/>
              <input required type="text" placeholder='State' name='state' value={data.state} onChange={onchangehandle}/>
            </div>
            <div className="multi-fields">
              <input required type="text" placeholder='Zip-Code' name='zipcode' value={data.zipcode} onChange={onchangehandle}/>
              <input required type="text" placeholder='Country' name='country' value={data.country} onChange={onchangehandle}/>
            </div>
            <input required type="text" placeholder='phone' name='phone' value={data.phone} onChange={onchangehandle}/>
        </div>


        <div className="place-order-right">
        <div className="cart-total">
          <h2>cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivary Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >Place order</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
