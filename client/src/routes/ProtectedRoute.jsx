import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from '../auth/session-utils';


const ProtectedRoute = ({ children,
    loginRoute = "/login", }) => {
    if (!isUserAuthenticated()) {
        return <Navigate to={loginRoute} replace />;
    }
    return children ?? <Outlet />;
};

export default ProtectedRoute;