<script lang="ts">
    import { navigate } from "svelte-routing";
    export let isAuth: boolean;

    if (!isAuth) {
        navigate("/", { replace: true});
    }
</script>

<slot/>