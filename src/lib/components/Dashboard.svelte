<script>
    import { ref, onValue, set } from 'firebase/database'
    import { auth } from '../store';

    export let db;

    let userData = {
        parkArea: "0",
        parking: "0"
    };

    let areaEmergency = false;

    let emergencyPressed = false;

    const userRef = ref(db, 'users/' + $auth.username);
    const parkingAreaStatus = ref(db, 'parkingAreaStatus');

    onValue(userRef, snapshot => {
        const data = snapshot.val()

        if (!data) return

        userData = data;
    })

    onValue(parkingAreaStatus, snapshot => {
        const data = snapshot.val()
        
        if (!data) return
        if (!data[userData.parkArea]) return

        if (data[userData.parkArea] === "emergency") { areaEmergency = true } else { areaEmergency = false }
    })

    const handleEmergencyPressed = () => {
        if (userData.parkArea === "0") return
        
        set(ref(db, 'parkingAreaStatus/' + userData.parkArea), "emergency")
        emergencyPressed = false
    }

    const handleExitParking = () => {
        if (userData.parkArea === "0" || userData.parking === "0") return

        set(ref(db, 'gateout'), 1)
        set(userRef, {
            parking: "0",
            parkArea: "0",
            password: $auth.password
        })
    }

    $: parked = userData.parkArea !== "0" && userData.parking !== "0"
</script>

<div class="flex flex-col gap-4 bg-base-100 rounded-lg p-4">
    {#if !parked}
        <p>Welcome, {$auth.username}. You are not parked.</p>
    {:else}
        <h2 class="text-lg text-center font-bold">Welcome, {$auth.username}</h2>
        <div class="divider"></div>
        {#if areaEmergency}
            <h2 class="text-lg font-bold text-warning text-center">⚠ ALERT: Another user alerted that your parking area is in an emergency! ⚠</h2>
        {/if}
        <h2 class="text-lg">Your parking area: <span class="font-bold">{userData.parkArea}</span></h2>
        <h2 class="text-lg">Your parking space: <span class="font-bold">{userData.parking}</span></h2>
        <div class="divider"></div>
        <div class="flex flex-row-reverse gap-4">
            <button class="btn btn-primary" on:click={() => handleExitParking()}>exit parking</button>
            <button class="btn btn-error" on:click={() => emergencyPressed = true}>call emergency</button>
        </div>
    {/if}

    {#if emergencyPressed}
        <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-secondary rounded-lg w-full max-w-xl text-center">
            <h2 class="text-xl font-bold">⚠ Are your sure you want to call an emergency? ⚠</h2>
            <div class="flex justify-center gap-4 mt-4">
                <button class="btn btn-error" on:click={() => handleEmergencyPressed()}>Yes</button>
                <button class="btn btn-primary" on:click={() => emergencyPressed = false}>Cancel</button>
            </div>
        </div>
    {/if}
</div>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>