import { useState } from "react";
import AuthContext, { AuthContextProps } from "./auth-context.ts";

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [isAuth, setAuth] = useState<boolean>(!!localStorage.getItem('token'));

    const contextValue: AuthContextProps = {
        isAuthenticated: isAuth,
        setIsAuthenticated: setAuth
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
