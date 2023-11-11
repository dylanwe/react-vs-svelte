import useAuth from "../../hooks/auth.hooks.ts";

export default function ToDoHeader() {
    const { logout } = useAuth();

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