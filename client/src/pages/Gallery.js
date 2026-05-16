import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import './Gallery.css';

const Gallery = () => {
  return (
    <section className="gallery-page">
      <div className="gallery-hero">
        <div>
          <p className="eyebrow">Fresh produce gallery</p>
          <h1>See our fruits and vegetables up close</h1>
          <p>Browse high-quality product images and shop directly from the gallery.</p>
          <Link to="/products" className="primary-button">Shop the market</Link>
        </div>
      </div>

      <div className="image-grid">
        {products.map((product) => (
          <article key={product.id} className="image-card">
            <img src={product.image} alt={product.name} />
            <div className="image-overlay">
              <p>{product.category}</p>
              <h2>{product.name}</h2>
              <Link to={`/product/${product.id}`} className="secondary-button">View product</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
