import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <NavLink to='/' className='logo'>
        <h1>YT Cage</h1>
      </NavLink>
    </nav>
  );
};

export default Navbar;
