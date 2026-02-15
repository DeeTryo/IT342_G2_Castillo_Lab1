import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const username = "User"; 

    const handleLogout = () => {
        // 1. Clear any stored tokens
        localStorage.removeItem('token'); 

        // 2. Redirect to Landing page
        navigate('/'); 
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>MyApp</h2>
                <nav>
                    <ul>
                        <li className="active">Overview</li>
                        <li>Settings</li>
                        <li>Profile</li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-btn">
                    Log Out
                </button>
            </aside>

            <main className="main-content">
                <header>
                    <h1>Welcome back, {username}!</h1>
                </header>

                <div className="content-area">
                    <h2>Recent Activity</h2>
                    <p>You have successfully logged in. This is your placeholder dashboard.</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;