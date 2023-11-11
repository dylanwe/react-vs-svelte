interface ToDoFormProps {
    newToDo: string,
    setNewToDo: (newToDo: string) => void,
    addToDo: () => void,
}

export default function ToDoForm({ newToDo, setNewToDo, addToDo }: ToDoFormProps) {
    return <form className="flex gap-4 my-4">
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
}