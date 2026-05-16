import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const validation = {};
    if (!formData.fullName.trim()) validation.fullName = 'Full name is required';
    if (!formData.email.trim()) validation.email = 'Email is required';
    if (!formData.phone.trim()) validation.phone = 'Phone number is required';
    if (!formData.address.trim()) validation.address = 'Delivery address is required';
    if (!formData.city.trim()) validation.city = 'City is required';
    if (!formData.state.trim()) validation.state = 'State is required';
    if (!formData.pincode.trim()) validation.pincode = 'Pincode is required';
    return validation;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    navigate('/payment', { state: { shipping: formData } });
  };

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h1>Shipping details</h1>
          <p>Complete your delivery information before payment.</p>
        </div>
        <Link to="/cart" className="secondary-button">Back to cart</Link>
      </div>

      {items.length === 0 ? (
        <div className="checkout-empty">
          <p>Your cart is empty.</p>
          <Link to="/products" className="primary-button">Browse products</Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label>
                Full name
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
            </div>
            <div className="field-group">
              <label>
                Phone number
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>
              <label>
                Pincode
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                />
                {errors.pincode && <span className="field-error">{errors.pincode}</span>}
              </label>
            </div>
            <label>
              Full address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House no, street, locality"
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </label>
            <div className="field-group">
              <label>
                City
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Delhi"
                />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </label>
              <label>
                State
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Delhi"
                />
                {errors.state && <span className="field-error">{errors.state}</span>}
              </label>
            </div>

            <button type="submit" className="primary-button">Continue to payment</button>
          </form>

          <aside className="checkout-summary">
            <div className="summary-card">
              <h2>Order summary</h2>
              <p>{items.length} items in cart</p>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <p className="summary-note">Shipping and taxes calculated at payment.</p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Checkout;
