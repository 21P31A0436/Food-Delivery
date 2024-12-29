import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { handleerror,handlsuccess } from '../../utils';
import { toast, ToastContainer } from 'react-toastify';

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Sign up");
    const navigate = useNavigate();
    const  { url , setToken} = useContext(StoreContext);
    // const {token,setToken} = useContext(StoreContext);
    // const url="http://localhost:8000"

    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}))
      console.log(data)
    }

    useEffect(()=>{
      console.log(data)
    },[data]);

    const onLogin = async(e) =>{
      e.preventDefault()
      let newUrl = url;
      // if(currState == "Login"){
      //   newUrl += '/api/user/login' 
      // }
      // else{
      //   newUrl += '/api/user/register'
      // }
      newUrl += currState === "Login" ? "/api/user/login" : "/api/user/register";
      // const res = await axios.post(newUrl,data);
      const response = await fetch(newUrl,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(data)

      });
      const res = await response.json()
      console.log(res);
      const {success,message,token,name } = res;
      if(success){
        // handlsuccess(message)
        toast.success("account created")
        setToken(token);
        localStorage.setItem("token",token)
        localStorage.setItem("name",name);
        setShowLogin(false);
        setTimeout(()=>{
          navigate('/')
        },1000)
        

      }
      else{
        alert('details incorrect');
      }
    }
     
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img src={assets.cross_icon} alt="" onClick={()=>setShowLogin(false)}/>
        </div>
        <div className="login-popup-inputs">
            { currState ==="Login"?<></>:<input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required/> }
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your Password' required/>
        </div>
        <button >{currState === "Sign up"?"Create Account": "Login"}</button>

        <div className="login-popup-condition">
            <input type="checkbox" />
            <p>By containing ,i agree to the Terms and policy</p>
        </div>

        {currState === "Login"
        ?<p>create account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>: 
        <p>Already account? <span onClick={()=>setCurrState("Login")}>Login</span></p>
        }


      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginPopup;
