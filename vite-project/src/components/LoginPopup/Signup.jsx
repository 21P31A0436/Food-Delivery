import  { useState } from 'react';
import { MdEmail, } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// import './Signup.css';
import './LoginPopup.css';
// import { handleerror, handlesucess } from '../Utils';
import { ToastContainer } from 'react-toastify';
const Signup = () => {

    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
    const navigate = useNavigate();
    const changehandle = (e)=>{
      const name = e.target.name;
      const value = e.target.value
      setData(data=>({...data,[name]:value}))
      console.log(data)

    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        const { name,email,password } = data;
        if(!name || !email || !password){
          return handleerror("name,email,password required")
        }
        try{
          const url = 'http://localhost:8000/api/user/register';
          const response = await fetch(url,{
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(data)
          });
          const res = await response.json()

          const {success,message,error} = res;
          if(success){
            handlesucess(message);
            setTimeout(()=>{
              navigate('/login')
            },1000)
          }
          else if(error){
            const details = error?.details[0].message;
            handleerror(details)
          }
          else if(!success){
            handleerror(message);
          }
          console.log(res)
        }
        catch(err){
          handleerror(err)
        }
    }
  return (
    <div className='login-popup'>

          <div >
          
          <form onSubmit={handlesubmit} className='login-popup-container'>
            <h2 className='login-popup-title'>Sign up</h2>
            <div className='login-popup-inputs'>
              <label htmlFor="name">Name</label>
              <input type="text" name='name' autoFocus placeholder='enter your name' value={data.name} onChange={changehandle}/>
            </div>
            <div className='login-popup-inputs'>
              <label htmlFor="email">Email</label>
              <input type="text" name='email'  placeholder='Enter Your Email' value={data.email} onChange={changehandle}
              />
              <MdEmail className='icon'/>
            </div>

            <div className='login-popup-inputs'>
              <label htmlFor="password">Password</label>
              <input type="text"
              name='password'
              
              placeholder='Enter Your Password'
              value={data.password}
              onChange={changehandle}
              />
              <FaLock className='icon'/>
            </div>
              

              <button type='submit' className='login-popup-container button'>Submit</button>

              <span>Already have account? <Link to='/login'>Login</Link></span>

          </form>
          <ToastContainer />
        </div>
    </div>
    
  );
}

export default Signup;
