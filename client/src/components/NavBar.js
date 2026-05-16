import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const { totalItems } = useCart();
  return (
    <header className="store-navbar">
      <div className="store-brand">
        <Link to="/">
          <img src="/sabaji-wala-logo.png" alt="Sabji Wale" className="brand-logo" />
        </Link>
      </div>
      <nav className="store-links">
        <Link to="/products">Products</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart{totalItems ? ` (${totalItems})` : ''}</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    </header>
  );
};

export default NavBar;
