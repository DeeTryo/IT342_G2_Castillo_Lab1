import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './css/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setFirstName(user.firstName);
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login');
            }
        } else {
            // No user data, redirect to login
            navigate('/login');
        }
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <Sidebar currentPage="dashboard" />

            <main className="main-content">
                <header>
                    <h1>Welcome! {firstName}</h1>
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