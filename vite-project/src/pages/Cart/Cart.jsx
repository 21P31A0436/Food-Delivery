import React, { useContext } from 'react';
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartItems,food_list,removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Romove</p>
        </div>
        <br />
        
        <hr />

        {food_list.map((item)=>{
          if(cartItems[item._id]>0){
            return(
              <div  key={item._id}>
                  <div className="cart-items-title cart-items-item">
                  <img src={url + '/images/'+item.image} alt="" />
                  {/* <img src={item.image} alt="" /> */}
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item._id]}</p>

                  <p>{item.price*cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
                </div>
               <hr />
              </div>
              
            )
          }
        })}
      </div>

      <div className="cart-bottom">
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
              <p>${getTotalCartAmount()=== 0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
        

        <div className="cart-promocode">
          <div>
            <p>if you have prome code enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Enter Promo Code here' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;