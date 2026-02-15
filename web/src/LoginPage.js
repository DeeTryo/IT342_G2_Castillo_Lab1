import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        try {
            // Sends data to your Spring Boot Backend
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);

            // If successful (HTTP 200), redirect the user
            console.log("Login Success:", response.data);
            
            // TODO: If your backend sends a JWT token later, save it here:
            // localStorage.setItem('token', response.data.token);

            navigate('/dashboard'); // Redirects to the dashboard
        } catch (error) {
            // Handles HTTP 401 (Unauthorized) or connection errors
            if (error.response && error.response.status === 401) {
                setErrorMessage("Invalid email or password.");
            } else {
                setErrorMessage("Something went wrong. Is the backend running?");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back</h2>
                <p className="sub-text">Please enter your details to sign in.</p>
                
                {errorMessage && <div className="error-alert">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="login-btn">Log In</button>
                </form>

                <p className="footer-text">
                    Don't have an account? <Link to="/register">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;