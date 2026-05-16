import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
};

const Register = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const validation = {};
    if (!formData.fullName.trim()) validation.fullName = 'Full name is required';
    if (!formData.email.trim()) validation.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) validation.email = 'Enter a valid email';
    if (!formData.phone.trim()) validation.phone = 'Phone number is required';
    if (!formData.password) validation.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) validation.confirmPassword = 'Passwords must match';
    if (!formData.address.trim()) validation.address = 'Address is required';
    if (!formData.city.trim()) validation.city = 'City is required';
    if (!formData.state.trim()) validation.state = 'State is required';
    if (!formData.pincode.trim()) validation.pincode = 'Pincode is required';
    return validation;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFeedback('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem('sabjiwalle_user', JSON.stringify({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone
    }));
    localStorage.setItem('username', formData.fullName);
    setFeedback('Registration complete. Redirecting to login...');
    setTimeout(() => navigate('/login'), 900);
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-intro">
          <span className="register-tag">Sabji Wale account</span>
          <h1>Fresh groceries delivered with ease</h1>
          <p>Sign up for fast delivery, exclusive offers, and a smoother shopping experience.</p>
          <div className="register-features">
            <div>
              <strong>Quick checkout</strong>
              <span>Save your address and preferences for repeat orders.</span>
            </div>
            <div>
              <strong>Smart order tracking</strong>
              <span>Know when your vegetables will arrive.</span>
            </div>
            <div>
              <strong>Member discounts</strong>
              <span>Get special deals for loyal customers.</span>
            </div>
          </div>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <h2>Create your account</h2>

          <label>
            Full name
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Arindam Mondal"
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </label>

          <div className="field-row">
            <label>
              Email
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
              Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="xxxxx xxxxx"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
          </div>

          <div className="field-row">
            <label>
              Password
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </label>
            <label>
              Confirm password
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </label>
          </div>

          <label>
            Address
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 MG Road, near market"
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </label>

          <div className="field-row">
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

          <button type="submit" className="submit-button">Create account</button>
          {feedback && <p className="register-feedback">{feedback}</p>}
          <p className="register-note">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
