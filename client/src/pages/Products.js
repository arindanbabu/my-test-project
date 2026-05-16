import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import './Products.css';

const Products = () => {
  const { addItem } = useCart();

  return (
    <section className="products-page">
      <div className="products-header">
        <div>
          <p className="eyebrow">Fresh from the farm</p>
          <h1>Vegetables & groceries</h1>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-content">
              <div>
                <span className="product-category">{product.category}</span>
                <h2>{product.name}</h2>
              </div>
              <p className="product-price">₹{product.price} / {product.unit}</p>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="product-actions">
              <Link className="secondary-button" to={`/product/${product.id}`}>View</Link>
              <button className="primary-button" onClick={() => addItem(product)}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Products;
