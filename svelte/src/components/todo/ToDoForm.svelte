<script lang="ts">
    export let newToDo: string;
    export let addToDo: () => void;
</script>

<form on:submit|preventDefault={() => addToDo()} class="flex gap-4 my-4">
    <input
            type="text"
            class="border-2 flex-1 px-4 rounded-md form-input"
            placeholder="Description"
            bind:value={newToDo}
    />
    <button
            type="submit"
            class="btn btn-primary rounded-md"
    >
        Add
    </button>
</form>
