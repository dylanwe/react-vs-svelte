import { LOGIN } from "../constants/pages.ts";
import { Link } from "react-router-dom";
import useAuth from "../hooks/auth.hooks.ts";
import AuthForm from "../components/auth/AuthForm.tsx";

function LoginLink() {
    return <>
        Already have an account?
        <Link to={LOGIN}
              className="ml-1 font-medium text-primary-600 hover:underline">Login</Link>
    </>
}

export default function Register() {
    const { register, loading } = useAuth();

    return <AuthForm
        title="Create an account"
        submitText="Register"
        loading={loading}
        onSubmit={register}
        LinkElement={<LoginLink/>}
    />
}