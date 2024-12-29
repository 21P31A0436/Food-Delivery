import  { useState } from 'react';
import { MdEmail, } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// import './Signup.css';
// import { handleerror, handlesucess } from '../Utils';
import { ToastContainer } from 'react-toastify';
const Login = () => {

    const [data,setData] = useState({
      
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
    const handlelogin = async(e)=>{
        e.preventDefault();
        const { email,password } = data;
        if( !email || !password){
          return handleerror("email,password required")
        }
        try{
          const url = 'http://localhost:8000/api/user/login';
          const response = await fetch(url,{
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(data)

          });
          const res = await response.json()

          const {success,message,token,name,error} = res;
          if(success){
            handlesucess(message);
            localStorage.setItem('token',token);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=>{
              navigate('/home')
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
    <div className='wrapper'>

          <div className='container'>
          
          <form onSubmit={handlelogin}>
            <h2>Login</h2>
            
            <div className='input-box'>
              <label htmlFor="email">Email</label>
              <input type="text" name='email'  placeholder='Enter Your Email' value={data.email} onChange={changehandle}
              />
              <MdEmail className='icon'/>
            </div>

            <div className='input-box'>
              <label htmlFor="password">Password</label>
              <input type="text"
              name='password'
              
              placeholder='Enter Your Password'
              value={data.password}
              onChange={changehandle}
              />
              <FaLock className='icon'/>
            </div>
              

              <button type='submit'>Submit</button>

              <span>No account? <Link to='/signup'>Register</Link></span>

          </form>
          <ToastContainer />
        </div>
    </div>
    
  );
}

export default Login;
