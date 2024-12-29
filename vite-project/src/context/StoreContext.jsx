import { createContext, useEffect, useState } from "react";

// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);


const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:5000"
    const [token,setToken] = useState("");
    const [food_list,setFoodlist] = useState([])

    const addToCart = async(itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: {
                  "content-Type": "application/json",
                  token: token, // Add token to headers
                },
                body: JSON.stringify({ itemId }), // Convert the body to JSON
              });
        }
    }

    const removeFromCart = async(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post('http://localhost:5000/api/cart/remove',{itemId},{headers:{token}})
        }
    }


    const getTotalCartAmount = ()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item] 
            }
            

        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{

        const response = await axios.get("http://localhost:5000/api/food/list");
        setFoodlist(response.data.data);
        // const response = await fetch("http://localhost:5000/api/food/list");
        // const data = response.json();
        // setFoodlist(data.data)

    }


    const loadCartData = async(token)=>{
        const response = await axios.post("http://localhost:5000/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData()
    },[])

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    })
    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
                    {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;