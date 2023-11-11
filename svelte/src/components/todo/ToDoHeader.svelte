<script lang="ts">
    import { isAuth } from "../../store/auth";
    import { navigate } from "svelte-routing";
    import { LOGIN } from "../../constants/pages";
    import { TOKEN_KEY } from "../../constants/stored-token-key";

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        isAuth.set(false);
        navigate(LOGIN, { replace: true });
    }
</script>

<div class="flex justify-between">
    <h1 class="text-4xl font-black">ToDos</h1>
    <button
            type="button"
            class="btn btn-secondary rounded-md"
            on:click={logout}
    >
        Logout
    </button>
</div>
