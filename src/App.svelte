<script>
  import { initializeApp } from "firebase/app";
  import firebaseConfig from './lib/firebaseConfig.json';
  import { getDatabase, ref, onValue, set } from 'firebase/database';
  import AuthCard from "./lib/components/AuthCard.svelte";
  import Dashboard from "./lib/components/Dashboard.svelte";
  import {auth, loggedIn} from './lib/store';

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

</script>

<div class="flex flex-col gap-10 justify-center p-4">
  <h1 class="text-5xl font-extrabold text-center">SPARK ⚡</h1>
  {#if !$loggedIn}
    <AuthCard db={db}/>
  {:else}
    <Dashboard db={db}/>
  {/if}
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    --tw-bg-opacity: 1;
    background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity));
  }
</style>
