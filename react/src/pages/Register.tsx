import { LOGIN, TODOS } from "../constants/pages.ts";
import { Link } from "react-router-dom";
import useAuth from "../hooks/auth.hooks.ts";
import AuthForm from "../components/auth/AuthForm.tsx";
import { publicAxios } from "../util/axios.ts";
import { TOKEN_KEY } from "../constants/stored-token-key.ts";
import { useState } from "react";

function LoginLink() {
    return <>
        Already have an account?
        <Link to={LOGIN}
              className="ml-1 font-medium text-primary-600 hover:underline">Login</Link>
    </>
}

export default function Register() {
    const { setIsAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false)

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

    return <AuthForm
        title="Create an account"
        submitText="Register"
        loading={loading}
        onSubmit={register}
        LinkElement={<LoginLink/>}
    />
}