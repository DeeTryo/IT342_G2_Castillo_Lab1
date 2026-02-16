import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './css/ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <Sidebar currentPage="profile" />

            <main className="main-content">
                <header>
                    <h1>My Profile</h1>
                </header>

                <div className="profile-card">
                    <h2>Account Information</h2>
                    <div className="profile-info">
                        <div className="info-group">
                            <label>First Name:</label>
                            <p>{user.firstName}</p>
                        </div>
                        <div className="info-group">
                            <label>Last Name:</label>
                            <p>{user.lastName}</p>
                        </div>
                        <div className="info-group">
                            <label>Email:</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-group">
                            <label>User ID:</label>
                            <p>{user.user_id}</p>
                        </div>
                        {user.created_at && (
                            <div className="info-group">
                                <label>Created At:</label>
                                <p>{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        )}
                        {user.last_login && (
                            <div className="info-group">
                                <label>Last Login:</label>
                                <p>{new Date(user.last_login).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="profile-actions">
                    <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
