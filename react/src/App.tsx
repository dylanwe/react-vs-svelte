import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import ToDos from "./pages/ToDos.tsx";
import useAuth from "./hooks/auth.hooks.ts";
import { LOGIN, REGISTER, TODOS } from "./constants/pages.ts";
import Register from "./pages/Register.tsx";

function App() {
    const {isAuthenticated} = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path={LOGIN} element={<Login />} />
                <Route path={REGISTER} element={<Register />} />
                <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path={TODOS} element={<ToDos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


interface PrivateRoutesProps {
    isAuthenticated: boolean;
}

function PrivateRoutes({isAuthenticated}: PrivateRoutesProps) {
    return (
        isAuthenticated ? <Outlet /> : <Navigate to={"/"} />
    )
}

export default App
