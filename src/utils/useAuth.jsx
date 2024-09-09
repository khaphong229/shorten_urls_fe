import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', null);
    const navigate = useNavigate();

    const login = async (token) => {
        setToken(token);
        navigate('/dashboard');
    };

    const logout = () => {
        setToken(null);
        navigate('/', { replace: true });
    };

    const value = useMemo(
        () => ({
            token,
            login,
            logout,
        }),
        [token],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
