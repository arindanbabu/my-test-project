import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { shipping, paymentMethod, subtotal } = location.state || {};
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <section className="success-page">
      <div className="success-card">
        <span className="success-icon">✓</span>
        <h1>Order confirmed</h1>
        <p>Your order is on its way. Thank you for shopping with Sabji Wale!</p>
        <div className="success-meta">
          <p><strong>Order number:</strong> #{orderNumber}</p>
          {shipping && <p><strong>Delivery to:</strong> {shipping.fullName}, {shipping.city}</p>}
          {paymentMethod && <p><strong>Payment method:</strong> {paymentMethod === 'card' ? 'Card' : 'UPI / Wallet'}</p>}
          {subtotal != null && <p><strong>Total paid:</strong> ₹{subtotal + 49}</p>}
        </div>
        <div className="success-actions">
          <Link to="/products" className="primary-button">Continue shopping</Link>
          <Link to="/gallery" className="secondary-button">View gallery</Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
