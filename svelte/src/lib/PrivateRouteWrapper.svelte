<script lang="ts">
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import { isAuth } from "../store/auth";
    import { LOGIN } from "../constants/pages";

    onMount(() => {
        if (!$isAuth) {
            navigate(LOGIN, { replace: true });
        }
    })
</script>

{#if $isAuth}
    <slot/>
{/if}