import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, formData);
            // Save the token and username
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            
            alert("Login Successful!");
            navigate('/dashboard'); // Redirect to protected page
        } catch (err) {
            alert(err.response?.data?.error || "Login Failed");
        }
    };

    return (
        <div>
            <h2>Login Component</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required /><br/>
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required /><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;