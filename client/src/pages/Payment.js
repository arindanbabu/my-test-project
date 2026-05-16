import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shipping } = location.state || {};
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const validation = {};
    if (paymentMethod === 'card') {
      if (!cardDetails.cardName.trim()) validation.cardName = 'Cardholder name is required';
      if (!cardDetails.cardNumber.trim()) validation.cardNumber = 'Card number is required';
      if (!cardDetails.expiry.trim()) validation.expiry = 'Expiry date is required';
      if (!cardDetails.cvc.trim()) validation.cvc = 'CVC is required';
    }
    return validation;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!shipping || items.length === 0) {
      navigate('/checkout');
      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    clearCart();
    navigate('/success', {
      state: {
        shipping,
        paymentMethod,
        items,
        subtotal
      }
    });
  };

  if (!shipping || items.length === 0) {
    return (
      <section className="payment-empty">
        <div className="payment-empty-card">
          <h1>Payment not available</h1>
          <p>Complete checkout first so we can process your payment.</p>
          <Link className="primary-button" to="/checkout">Return to checkout</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="payment-page">
      <div className="payment-header">
        <div>
          <p className="eyebrow">Payment</p>
          <h1>Complete your order</h1>
          <p>Choose a payment method and confirm your details.</p>
        </div>
        <Link to="/cart" className="secondary-button">Back to cart</Link>
      </div>

      <div className="payment-grid">
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="payment-section">
            <h2>Shipping</h2>
            <p>{shipping.fullName}</p>
            <p>{shipping.address}, {shipping.city}, {shipping.state} - {shipping.pincode}</p>
            <p>{shipping.phone} · {shipping.email}</p>
          </div>

          <div className="payment-section">
            <label className="radio-option">
              <input
                type="radio"
                name="method"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Credit / Debit card
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="method"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              UPI / Wallet
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="field-group">
              <label>
                Cardholder name
                <input
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                />
                {errors.cardName && <span className="field-error">{errors.cardName}</span>}
              </label>
              <label>
                Card number
                <input
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                />
                {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
              </label>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="field-group">
              <label>
                Expiry date
                <input
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                />
                {errors.expiry && <span className="field-error">{errors.expiry}</span>}
              </label>
              <label>
                CVC
                <input
                  name="cvc"
                  value={cardDetails.cvc}
                  onChange={handleChange}
                  placeholder="123"
                />
                {errors.cvc && <span className="field-error">{errors.cvc}</span>}
              </label>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="field-group">
              <label>
                UPI ID
                <input name="upiId" placeholder="rahul@upi" disabled />
              </label>
            </div>
          )}

          <button type="submit" className="primary-button">Confirm payment</button>
        </form>

        <aside className="payment-summary">
          <div className="summary-card">
            <h2>Order summary</h2>
            <p>{items.length} items</p>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>₹49</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{subtotal + 49}</span>
            </div>
            <p className="summary-note">You will be redirected to order confirmation after payment.</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Payment;
