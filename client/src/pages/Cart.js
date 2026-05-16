import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  return (
    <section className="cart-page">
      <div className="cart-head">
        <div>
          <p className="eyebrow">Your cart</p>
          <h1>Shopping cart</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link className="primary-button" to="/products">Browse products</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {items.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div>
                    <h2>{item.name}</h2>
                    <p>₹{item.price} / {item.unit}</p>
                  </div>
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-right">
                  <p className="item-total">₹{item.price * item.quantity}</p>
                  <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <div className="summary-card">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <p className="summary-note">Taxes and delivery calculated at checkout.</p>
              <Link className="primary-button" to="/checkout">Proceed to checkout</Link>
              <button className="secondary-button" onClick={clearCart}>Clear cart</button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
