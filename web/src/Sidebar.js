import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <h2>MyApp</h2>
            <nav>
                <ul>
                    <li className={currentPage === 'dashboard' ? 'active' : ''}>
                        <Link to="/dashboard">Overview</Link>
                    </li>
                    <li className={currentPage === 'profile' ? 'active' : ''}>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
            <button onClick={handleLogout} className="logout-btn">
                Log Out
            </button>
        </aside>
    );
};

export default Sidebar;
