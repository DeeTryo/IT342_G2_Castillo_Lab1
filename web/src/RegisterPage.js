import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Post to the backend (Make sure Spring Boot is running!)
            await axios.post('http://localhost:8080/api/auth/register', formData);
            
            alert("Registration Successful! Please log in.");
            navigate('/login'); 
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400) {
                alert("Error: " + error.response.data); // Shows "Email already registered"
            } else {
                alert("Registration failed. Is the backend running?");
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Account</h2>
                <p className="sub-text">Join us to manage your data securely.</p>
                
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="name@example.com"
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
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="register-btn">Sign Up</button>
                </form>

                <p className="register-footer">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;