import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const backendBase = process.env.REACT_APP_BACKEND_URL || '';

    const validate = () => {
        const errs = {};
        if (!formData.email) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email';
        if (!formData.password) errs.password = 'Password is required';
        else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
        return errs;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            return;
        }

        setLoading(true);
        setServerError('');
        try {
            const url = backendBase ? `${backendBase}/auth/login` : '/auth/login';
            const res = await axios.post(url, formData, { timeout: 10000 });
            const { token, username } = res.data || {};
            if (token) {
                localStorage.setItem('token', token);
                if (username) localStorage.setItem('username', username);
                navigate('/dashboard');
            } else {
                setServerError('Unexpected response from server');
            }
        } catch (err) {
            const msg = err.response?.data?.error || err.message || 'Login failed';
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-root">
            <form className="login-card" onSubmit={handleSubmit} noValidate>
                <h2 className="login-title">Welcome back</h2>

                <label htmlFor="email" className="sr-only">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                />
                {errors.email && <div id="email-error" className="field-error">{errors.email}</div>}

                <label htmlFor="password" className="sr-only">Password</label>
                <div className="password-row">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className={`input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                        required
                    />
                    <button
                        type="button"
                        className="toggle-pw"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {errors.password && <div id="password-error" className="field-error">{errors.password}</div>}

                {serverError && <div className="server-error" role="alert" aria-live="assertive">{serverError}</div>}

                <button className="btn" type="submit" disabled={loading}>
                    {loading ? <span className="spinner" aria-hidden="true" /> : 'Sign in'}
                </button>

                <div className="login-footer">
                    <a href="/register">Create an account</a>
                </div>
            </form>
        </div>
    );
};

export default Login;