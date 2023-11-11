import useAuth from "../../hooks/auth.hooks.ts";
import { TOKEN_KEY } from "../../constants/stored-token-key.ts";
import { LOGIN } from "../../constants/pages.ts";

export default function ToDoHeader() {
    const { setIsAuthenticated } = useAuth();

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        location.href = LOGIN;
    }

    return <div className="flex justify-between">
        <h1 className="text-4xl font-black">ToDos</h1>
        <button
            type="button"
            className="btn btn-secondary rounded-md"
            onClick={logout}
        >
            Logout
        </button>
    </div>
}