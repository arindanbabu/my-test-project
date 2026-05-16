import React from 'react';
import NavBar from './NavBar';
import './StoreLayout.css';

const StoreLayout = ({ children }) => {
  return (
    <div className="store-shell">
      <NavBar />
      <div className="store-main">{children}</div>
      <footer className="store-footer">
        <p>Sabji Wale clone React app • Farm fresh produce delivered.</p>
      </footer>
    </div>
  );
};

export default StoreLayout;
