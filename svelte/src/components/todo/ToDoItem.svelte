<script lang="ts">
    import type { ToDo } from "../../interfaces/ToDo";

    export let updateToDo: (todo: ToDo) => void;
    export let removeToDo: (id: number) => void;
    export let todo: ToDo;
</script>

<li
        class="bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 flex items-center justify-between gap-4 mb-2.5"
>
    <input
            type="checkbox" on:change={() => updateToDo(todo)}
            checked={todo.completed}
            class="checkbox checkbox-primary"
    />
    <span class={`flex-1 ${todo.completed && "line-through text-slate-500"}`}>
        {todo.description}
    </span>
    <button
            class="btn btn-ghost btn-xs btn-square"
            on:click={() => removeToDo(todo.id)}
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"/>
        </svg>
    </button>
</li>
