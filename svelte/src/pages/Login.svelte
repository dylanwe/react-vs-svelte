<script lang="ts">
    import AuthForm from "../components/auth/AuthForm.svelte";
    import { Link, navigate } from "svelte-routing";
    import { publicAxios } from "../util/axios";
    import { isAuth } from "../store/auth";
    import { TOKEN_KEY } from "../constants/stored-token-key";
    import { TODOS } from "../constants/pages";

    let loading = false;

    async function login(email: string, password: string) {
        loading = true;
        try {
            const res = await publicAxios.post("/auth/login", {
                email: email,
                password: password,
            })

            if (res.status === 200) {
                isAuth.set(true)
                localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data))
                navigate(TODOS, { replace: true })
            }
        } catch (e) {
            console.log("failed to login")
        }
        loading = false;
    }
</script>

<AuthForm
        title="Sign in to your account"
        submitText="Login"
        onSubmit={login}
        {loading}
>
    <div slot="link">
        Don’t have an account yet?
        <Link
                to="/register"
                class="ml-1 font-medium text-primary-600 hover:underline"
        >
            Sign up
        </Link>
    </div>
</AuthForm>