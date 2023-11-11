import { ToDo } from "../../interfaces/ToDo";

interface ToDoProps {
    todo: ToDo,
    removeToDo: (id: number) => void,
    updateToDo: (todo: ToDo) => void,
}

export default function ToDoItem({ todo, removeToDo, updateToDo }: ToDoProps) {
    return <li
        key={todo.id}
        className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 flex items-center justify-between gap-4 mb-2.5"
    >
        <input type="checkbox" onChange={() => updateToDo(todo)} checked={todo.completed}
               className="checkbox checkbox-primary"/>
        <span
            className={`flex-1 ${todo.completed && "line-through text-slate-500"}`}>{todo.description}</span>
        <button className="btn btn-ghost btn-xs btn-square" onClick={() => removeToDo(todo.id)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"/>
            </svg>
        </button>
    </li>
}