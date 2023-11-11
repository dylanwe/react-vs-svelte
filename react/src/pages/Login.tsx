import useAuth from "../hooks/auth.hooks.ts";
import { Link } from "react-router-dom";
import { REGISTER } from "../constants/pages.ts";
import AuthForm from "../components/auth/AuthForm.tsx";

function RegisterLink() {
    return <>
        Don’t have an account yet?
        <Link to={REGISTER} className="ml-1 font-medium text-primary-600 hover:underline">Sign
            up</Link>
    </>
}

export default function Login() {
    const { login, loading } = useAuth();

    return <AuthForm
        title="Sign in to your account"
        submitText="Login"
        loading={loading}
        onSubmit={login}
        LinkElement={<RegisterLink/>}
    />
}