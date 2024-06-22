import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from '../context/AuthProvider';

function ProtectedRoute({ children }) {
    const { isAuthorized, auth } = useAuth();

    useEffect(() => {
        console.log("Checking authorization...");
        auth().catch(error => console.error("Authentication error:", error));
    }, [auth]);  // Ensure auth is stable (not redefined on each render)


    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;