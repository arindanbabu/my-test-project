import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const fieldErrors = {};
    if (!formData.name.trim()) fieldErrors.name = 'Please enter your name';
    if (!formData.email.trim()) fieldErrors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) fieldErrors.email = 'Enter a valid email address';
    if (!formData.phone.trim()) fieldErrors.phone = 'Please enter your phone number';
    if (!formData.message.trim()) fieldErrors.message = 'Please describe your request';
    return fieldErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
  };

  return (
    <main className="contact-page">
      <div className="contact-shell">
        <header className="contact-header">
          <p className="eyebrow">Contact us</p>
          <h1>Need help with your order?</h1>
          <p>Send us a message and our support team will get back to you within a few hours.</p>
        </header>

        <div className="contact-layout">
          <section className="contact-info-card">
            <h2>Customer support</h2>
            <p>We’re here to help with orders, delivery, account issues, and more.</p>
            <div className="info-row">
              <span>Email</span>
              <strong>support@sabjiwale.com</strong>
            </div>
            <div className="info-row">
              <span>Phone</span>
              <strong>+91 98765 43210</strong>
            </div>
            <div className="info-row">
              <span>Hours</span>
              <strong>8:00 AM – 8:00 PM, Mon – Sat</strong>
            </div>
          </section>

          <section className="contact-form-card">
            {submitted ? (
              <div className="contact-success">
                <h2>Thanks! Your message has been sent.</h2>
                <p>One of our team members will reply to your email soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <label>
                  Your name
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
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
                  Subject
                  <select name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="general">General question</option>
                    <option value="order">Order support</option>
                    <option value="delivery">Delivery issue</option>
                    <option value="account">Account help</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your question or issue"
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </label>
                <button type="submit" className="primary-button">Send message</button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
