import { Dispatch, SetStateAction, useContext } from "react";
import AuthContext from "../context/auth/auth-context.ts";

interface AuthHooksInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export default function useAuth(): AuthHooksInterface {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    return {
        isAuthenticated,
        setIsAuthenticated,
    };
}