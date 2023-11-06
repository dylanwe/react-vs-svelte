import { Dispatch, SetStateAction, useState } from "react";
import { publicAxios } from "../util/axios.ts";
import { LOGIN, TODOS } from "../constants/pages.ts";

interface AuthHooksInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export default function useAuth(): AuthHooksInterface {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem("token")
    );
    const [loading, setLoading] = useState<boolean>(false);

    async function login(email: string, password: string) {
        setLoading(true);
        try {
            const res = await publicAxios.post("/auth/login", {email, password});
            if (res.status === 200) {
                setIsAuthenticated(true);
                localStorage.setItem("token", JSON.stringify(res.data));
                location.href = TODOS;
            }
        } catch (error) {
            console.log("failed to login");
        }

        setLoading(false);
    }

    function logout() {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        location.href = LOGIN;
    }

    return {
        isAuthenticated,
        setIsAuthenticated,
        loading,
        login,
        logout,
    };
}