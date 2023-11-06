import { useEffect, useState } from "react";
import useAxios from "../hooks/axios.hooks.ts";
import useAuth from "../hooks/auth.hooks.ts";

interface ToDo {
    id: number,
    description: string,
    completed: boolean,
}

export default function ToDos() {
    const api = useAxios()
    const [newToDo, setNewToDo] = useState("")
    const [todos, setTodos] = useState<ToDo[]>([])
    const {logout} = useAuth();

    async function getToDos() {
        const response = await api('todos');

        if (response.status !== 200) {
            console.log("Error retrieving todos")
            return;
        }

        setTodos([...response.data as ToDo[]]);
    }

    async function removeToDo(id: number) {
        await api.delete(`todos/${id}`);
        await getToDos();
    }

    async function updateToDo(todo: ToDo) {
        await api.put(`todos/${todo.id}`, {
            ...todo,
            completed: !todo.completed
        });
        await getToDos();
    }

    async function addToDo() {
        await api.post('todos', {
            description: newToDo,
            completed: false
        });
        await getToDos();
        setNewToDo("");
    }

    useEffect(() => {
        getToDos();
    }, []);

    return (
        <section className="max-w-2xl mx-auto py-16">
            <div className="flex justify-between">
                <h1 className="text-4xl font-black">ToDos</h1>
                <button
                    type="button"
                    className="btn btn-secondary rounded-md"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

            <form className="flex gap-4 my-4">
                <input
                    type="text"
                    className="border-2 flex-1 px-4 rounded-md form-input"
                    placeholder="Description"
                    value={newToDo}
                    onChange={(e) => setNewToDo(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-primary rounded-md"
                    onClick={() => addToDo()}
                >
                    Add
                </button>
            </form>

            <ul>
                {todos.map(todo => {
                    return <li
                        key={todo.id}
                        className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 flex items-center justify-between gap-4 mb-2.5"
                    >
                        <input type="checkbox" onChange={() => updateToDo(todo)} checked={todo.completed} className="checkbox checkbox-primary" />
                        <span className={`flex-1 ${todo.completed && "line-through text-slate-500"}`}>{todo.description}</span>
                        <button className="btn btn-ghost btn-xs btn-square" onClick={() => removeToDo(todo.id) }>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                            </svg>
                        </button>
                    </li>}
                )}
            </ul>
        </section>
    )
}