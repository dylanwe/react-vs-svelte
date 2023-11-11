<script>
    import { Route, Router } from "svelte-routing";
    import Login from "./pages/Login.svelte";
    import Register from "./pages/Register.svelte";
    import ToDos from "./pages/ToDos.svelte";
    import PrivateRouteWrapper from "./lib/PrivateRouteWrapper.svelte";
    import { LOGIN, REGISTER, TODOS } from "./constants/pages";

    export let url = "";
</script>

<Router {url}>
    <Route path={LOGIN} component={Login} />
    <Route path={REGISTER} component={Register} />
    <Route path={TODOS}>
        <PrivateRouteWrapper>
            <ToDos/>
        </PrivateRouteWrapper>
    </Route>
</Router>
