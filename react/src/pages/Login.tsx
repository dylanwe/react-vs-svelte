import useAuth from "../hooks/auth.hooks.ts";
import { Link } from "react-router-dom";
import { REGISTER, TODOS } from "../constants/pages.ts";
import AuthForm from "../components/auth/AuthForm.tsx";
import { publicAxios } from "../util/axios.ts";
import { TOKEN_KEY } from "../constants/stored-token-key.ts";
import { useState } from "react";

function RegisterLink() {
    return <>
        Don’t have an account yet?
        <Link to={REGISTER} className="ml-1 font-medium text-primary-600 hover:underline">Sign
            up</Link>
    </>
}

export default function Login() {
    const { setIsAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false)

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

    return <AuthForm
        title="Sign in to your account"
        submitText="Login"
        loading={loading}
        onSubmit={login}
        LinkElement={<RegisterLink/>}
    />
}