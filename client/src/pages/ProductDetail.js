import React from 'react';
import { Link, useParams } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="product-detail-page">
        <h1>Product not found</h1>
        <Link to="/products" className="secondary-button">Back to products</Link>
      </div>
    );
  }

  return (
    <section className="product-detail-page">
      <div className="product-detail-card">
        <img src={product.image} alt={product.name} />
        <div className="product-detail-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">₹{product.price} / {product.unit}</p>
          <p className="description">{product.description}</p>
          <div className="actions-row">
            <button className="primary-button" onClick={() => addItem(product)}>
              Add to cart
            </button>
            <Link to="/cart" className="secondary-button">View cart</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
