import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-shell">
      <header className="home-header">
        <div className="home-brand">Sabji Wale</div>
        <nav className="home-nav">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </header>

      <main className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Farm Fresh Vegetables Delivered</p>
          <h1>Fresh farm produce at your doorstep</h1>
          <p className="hero-text">
            Order seasonal vegetables, fruits and groceries from trusted farmers in minutes.
            Fast delivery, real-time updates, and special offers for registered customers.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/signup">Create Account</Link>
            <Link className="btn btn-secondary" to="/login">Login</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <h2>Why choose Sabji Wale?</h2>
            <ul>
              <li>Fresh produce from local farms</li>
              <li>Quick delivery with WhatsApp updates</li>
              <li>Exclusive member discounts</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
