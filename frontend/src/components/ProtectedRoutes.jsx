import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from '../context/AuthProvider';

function ProtectedRoute({ children }) {
    const { isAuthorized } = useAuth();
    return isAuthorized ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;