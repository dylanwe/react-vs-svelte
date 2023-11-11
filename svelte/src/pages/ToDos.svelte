<script lang="ts">
    import ToDoForm from "../components/todo/ToDoForm.svelte";
    import { privateAxios } from "../util/axios";
    import ToDoHeader from "../components/todo/ToDoHeader.svelte";
    import type { ToDo } from "../interfaces/ToDo";
    import { onMount } from "svelte";
    import ToDoItem from "../components/todo/ToDoItem.svelte";

    let todos: ToDo[] = [];
    let newToDo = "";

    async function getToDos() {
        const response = await privateAxios.get('todos');

        if (response.status !== 200) {
            console.log("Error retrieving todos")
            return;
        }

        todos = response.data as ToDo[];
    }

    async function removeToDo (id: number) {
        await privateAxios.delete(`todos/${id}`);
        await getToDos();
    }

    async function updateToDo(todo: ToDo) {
        await privateAxios.put(`todos/${todo.id}`, {
            ...todo,
            completed: !todo.completed
        });
        await getToDos();
    }

    async function addToDo() {
        await privateAxios.post('todos', {
            description: newToDo,
            completed: false
        });
        await getToDos();
        newToDo = "";
    }

    onMount(() => {
        getToDos();
    })
</script>

<section class="max-w-2xl mx-auto py-16 px-4">
    <ToDoHeader />

    <ToDoForm {addToDo} bind:newToDo/>

    {#if (todos.length > 0)}
        <ul>
            {#each todos as todo (todo.id)}
                <ToDoItem
                        {todo}
                        {updateToDo}
                        {removeToDo}
                />
            {/each}
        </ul>
    {:else}
        <p class="text-center text-gray-500">No todos yet</p>
    {/if}
</section>
