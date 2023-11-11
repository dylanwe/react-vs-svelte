import { Dispatch, SetStateAction, useContext, useState } from "react";
import { publicAxios } from "../util/axios.ts";
import { LOGIN, TODOS } from "../constants/pages.ts";
import AuthContext from "../context/auth/auth-context.ts";
import { TOKEN_KEY } from "../constants/stored-token-key.ts";

interface AuthHooksInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export default function useAuth(): AuthHooksInterface {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);

    async function login(email: string, password: string) {
        setLoading(true);
        try {
            const res = await publicAxios.post("/auth/login", { email, password });
            if (res.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data));
                location.href = TODOS;
            }
        } catch (error) {
            console.log("failed to login");
        }

        setLoading(false);
    }

    async function register(email: string, password: string) {
        setLoading(true);
        try {
            const res = await publicAxios.post("/auth/register", { email, password });
            if (res.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data));
                location.href = TODOS;
            }
        } catch (error) {
            console.log("failed to register");
        }

        setLoading(false);
    }

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        location.href = LOGIN;
    }

    return {
        isAuthenticated,
        setIsAuthenticated,
        loading,
        login,
        register,
        logout,
    };
}