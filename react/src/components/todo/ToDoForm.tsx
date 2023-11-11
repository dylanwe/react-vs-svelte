interface ToDoFormProps {
    newToDo: string,
    setNewToDo: (newToDo: string) => void,
    addToDo: () => void,
}

export default function ToDoForm({ newToDo, setNewToDo, addToDo }: ToDoFormProps) {
    return <form
        onSubmit={(e) => {
            e.preventDefault()
            addToDo()
        }}
        className="flex gap-4 my-4"
    >
        <input
            type="text"
            className="border-2 flex-1 px-4 rounded-md form-input"
            placeholder="Description"
            value={newToDo}
            onChange={(e) => setNewToDo(e.target.value)}
        />
        <button
            type="submit"
            className="btn btn-primary rounded-md"
        >
            Add
        </button>
    </form>
}