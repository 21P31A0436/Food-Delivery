import React, { useContext, useState } from 'react'
import './Navbar.css';
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("home");
  const navigate = useNavigate();
  // const { getTotalCartAmount, token } = useContext(StoreContext);
  const { getTotalCartAmount,token, setToken} = useContext(StoreContext)

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("")
    navigate("/")

  }
  return (
    <div className='navbar'>
      {/* <h1>Navbar</h1> */}
      <Link to='/'><img  src={assets.logo} alt="" className='logo' /></Link>
      <ul className='navbar-menu'>
        <a href="#home"><Link onClick={()=>setMenu("home")} className={menu==='home'?"active":" "}>Home</Link> </a>
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === 'Menu'?"active":" "}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile-App")} className={menu === 'Mobile-App'?"active":" "}>Mobile-App</a>
        <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu === 'Contact-us'?"active":" "}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt=''/>
        <div className='navbar-search-icon'>
            <Link to='/cart'><img src= {assets.basket_icon} className=''/></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
            <div className="dot"></div>
        </div>
        {!token?
          <button onClick={()=>setShowLogin( true )}>Sign-in</button>:
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='navbar-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logo out</p></li>

          </ul>
          </div>
          }
        {/* <button  onClick={()=>setShowLogin(true)}>Signin</button> */}
        {/* <Link to='/signup'> <button  >Sign In</button></Link> */}

      </div>
    </div>
  )
}

export default Navbar
