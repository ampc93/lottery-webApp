import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-neutral-dark text-neutral-light px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="hover:text-primary transition">
          Home
        </NavLink>
        <NavLink to="/roles" className="hover:text-primary transition">
          Roles
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;