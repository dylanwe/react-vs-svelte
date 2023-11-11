import { useEffect, useState } from "react";
import useAxios from "../hooks/axios.hooks.ts";
import ToDoHeader from "../components/todo/ToDoHeader.tsx";
import ToDoForm from "../components/todo/ToDoForm.tsx";
import { ToDo } from "../interfaces/ToDo.ts";
import ToDoItem from "../components/todo/ToDoItem.tsx";

export default function ToDos() {
    const api = useAxios()
    const [newToDo, setNewToDo] = useState("")
    const [todos, setTodos] = useState<ToDo[]>([])

    async function getToDos() {
        const response = await api.get('todos');

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
        <section className="max-w-2xl mx-auto py-16 px-4">
            <ToDoHeader/>

            <ToDoForm addToDo={addToDo} newToDo={newToDo} setNewToDo={setNewToDo}/>

            {todos.length > 0 ?
                <ul>
                    {todos.map(todo => {
                            return <ToDoItem
                                key={todo.id}
                                todo={todo}
                                removeToDo={removeToDo}
                                updateToDo={updateToDo}
                            />
                        }
                    )}
                </ul>
                :
                <p className="text-center text-gray-500">No todos yet</p>
            }
        </section>
    )
}