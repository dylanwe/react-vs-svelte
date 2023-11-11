<script lang="ts">
    import AuthForm from "../components/auth/AuthForm.svelte";
    import { Link, navigate } from "svelte-routing";
    import { publicAxios } from "../util/axios";
    import { isAuth } from "../store/auth";
    import { TODOS } from "../constants/pages";
    import { TOKEN_KEY } from "../constants/stored-token-key";

    let loading = false;

    async function register(email: string, password: string) {
        loading = true;
        try {
            const res = await publicAxios.post("/auth/register", {
                email: email,
                password: password,
            })

            if (res.status === 200) {
                isAuth.set(true)
                localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data))
                navigate(TODOS, { replace: true })
            }
        } catch (e) {
            console.log("failed to register")
        }
        loading = false;
    }
</script>

<AuthForm
        title="Create an account"
        submitText="Register"
        onSubmit={register}
        loading={loading}
>
    <div slot="link">
        Already have an account?
        <Link
                to="/"
                class="ml-1 font-medium text-primary-600 hover:underline"
        >
            Login
        </Link>
    </div>
</AuthForm>
