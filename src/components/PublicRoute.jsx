import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PublicRoute = ({ children }) =>{

    const { accessToken } = useAuth();
    
    if(accessToken){
        return <Navigate to="/dashboard" replace />;
    }

    return children;

};

export default PublicRoute;