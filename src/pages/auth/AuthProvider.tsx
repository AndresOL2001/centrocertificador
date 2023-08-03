import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    auth: boolean;
    logout: () => void;
    login:() => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            setAuth(true);
        }
    }, []);

    const login = () => {
            setAuth(true);

    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth(false);
    }

    const authContextValue: AuthContextType = {
        auth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};