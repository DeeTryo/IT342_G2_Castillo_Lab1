import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by checking localStorage
    const user = localStorage.getItem('user');

    if (!user) {
        // If no user data, redirect to login
        return <Navigate to="/login" replace />;
    }

    // If user is logged in, render the component
    return children;
};

export default ProtectedRoute;
