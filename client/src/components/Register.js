import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Password Validation Pattern: Min 8 chars, 1 uppercase, 1 number, 1 special char
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Basic Validation
        if (!passwordPattern.test(formData.password)) {
            return setError("Password must be 8+ chars with Uppercase, Number, and Special Character.");
        }

        // 2. Confirm Password Check
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match!");
        }

        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            alert("Registration Successful!");
            // Redirect logic here
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <ShieldCheck className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:bg-blue-300"
                    >
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;