<script>
    import { auth, loggedIn } from "../store";
    import { ref, set, get } from 'firebase/database';

    export let db;
    let userDoesNotExist = false;
    let wrongPassword = false;

    const register = () => {
        if (!$auth.password || !$auth.username) return;

        set(ref(db, 'users/' + $auth.username), {
            password: $auth.password,
            parkArea: "0",
            parking: "0"
        })

        $loggedIn = true;
    }

    const login = async () => {
        userDoesNotExist = false
        wrongPassword = false
        const user = await get(ref(db, 'users/' + $auth.username));
        const data = user.val()

        if (!data) { userDoesNotExist = true; return; }
        console.log(data)
        console.log($auth.password)
        if (data.password !== $auth.password) { wrongPassword = true; return; }

        $loggedIn = true;
    }
</script>

<div class="flex flex-col gap-4 justify-center rounded-lg p-6 bg-base-200">
    <h1 class="text-3xl font-bold">Register / Login</h1>

    {#if userDoesNotExist}
        <p class="text-lg font-bold text-warning">⚠ User does not exist!</p>
    {/if}
    {#if wrongPassword}
        <p class="text-lg font-bold text-warning">⚠ Wrong password!</p>
    {/if}

    <div class="form-control w-full">
        <label for="plate" class="label">
            <span class="label-text">Car License No.</span>
        </label>
        <input
            type="text"
            placeholder="ABC123"
            class="input input-bordered w-full"
            id="plate"
            bind:value={$auth.username}
        />
    </div>

    <div class="form-control w-full">
        <label for="password" class="label">
            <span class="label-text">Password</span>
        </label>
        <input
            type="password"
            placeholder="***"
            class="input input-bordered w-full"
            id="password"
            bind:value={$auth.password}
        />
    </div>

    <div class="flex flex-row-reverse gap-4">
        <button class="btn btn-primary" on:click={() => login()}>Login</button>
        <button class="btn btn-primary" on:click={() => register()}>Register</button>
    </div>
</div>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
