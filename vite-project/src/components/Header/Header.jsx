import React from 'react';
import './Header.css';

const Header = () => {
  return (
      <div className='header'>
        <div className='header-contents'>
            <h2>Order your favourites food here</h2>
            <p>Choose from diverse main feature a delecatable array of dishes crafted with food </p>
            <a href="#explore-menu"> <button>View Menu</button> </a>
        </div>
      </div>
  );
}

export default Header;
