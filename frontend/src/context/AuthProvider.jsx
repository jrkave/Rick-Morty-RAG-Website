import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await api.post('/api/token/', {username, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            setUser(res.data.user);
            setError('');
            setIsAuthorized(true);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setUser(null);
            setIsAuthorized(false);
        }
    }

    const logout = () => {
        localStorage.clear();
        setError('');
        setUser(null);
        setIsAuthorized(false);
    }

    const register = async (username, password) => {
        try {
            const res = await api.post('api/user/register/', {username, password});
            login(username, password);
        } catch (error) {
            setError('Registration failed. Please try again.');
            setIsAuthorized(false);
            setUser(null);
        }
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post('/api/token/refresh/', {refresh: refreshToken});
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
            } else {
                setIsAuthorized(false);
                setUser(null);
                setError('Refresh token failed', error);
            }
        } catch (error) {
            setIsAuthorized(false);
            setUser(null);
            setError('Refresh token failed: ', error);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // Token absent
        if (!token) {
            setError('No token found.');
            setIsAuthorized(null);
            setUser(null);
            return;
        }

        // Token present
        try {
            const decodedToken = jwtDecode(token);
            const tokenExpiration = decodedToken.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                // Token is not valid, attempt to refresh
                await refreshToken();
            } else {
                // Token is valid 
                setIsAuthorized(true);
            }
        } catch (error) {
            setUser(null);
            setIsAuthorized(null);
            setError('Error with token: ', error)
        }
    };

    const value = { user, error, isAuthorized, login, logout, register, auth } ;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
