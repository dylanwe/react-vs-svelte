<script lang="ts">
    export let title: string;
    export let submitText: string;
    export let onSubmit: (email: string, password: string) => Promise<void>;
    export let loading: boolean;

    let email = '';
    let password = '';
</script>

<section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    {title}
                </h1>
                <form class="space-y-4 md:space-y-6">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your
                            email</label>
                        <input
                            bind:value={email}
                            type="email"
                            name="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="name@company.com"
                            required={true}
                        />
                    </div>
                    <div>
                        <label for="password"
                               class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                                bind:value={password}
                                type="password"
                                name="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                placeholder="••••••••"
                                required={true}
                        />
                    </div>
                    <button
                            type="button"
                            class="btn btn-primary w-full"
                            on:click={() => onSubmit(email, password)}
                    >
                        {submitText}
                        {#if loading}
                            <span class="loading loading-spinner loading-xs"></span>
                        {/if}
                    </button>
                    <p class="text-sm font-light text-gray-500">
                        <slot name="link"></slot>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
