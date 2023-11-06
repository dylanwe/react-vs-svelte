import { createContext, Dispatch, SetStateAction } from "react";

export interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
   isAuthenticated: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsAuthenticated: () => {},
});

export default AuthContext;