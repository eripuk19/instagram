<script>
    import { enhance } from "$app/forms";
    import Warning from "$lib/components/Warning.svelte";
    export let form;
  </script>
  
  <div class="flex justify-center items-center h-screen">
    <form action="?/login" method="POST" use:enhance 
          class="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-80">
      
      <h1 class="text-xl font-bold text-center">Login</h1>
  
      <label for="email" class="font-medium">E-Mail</label>
      <input type="text" name="email" id="email" required
             class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  
      <label for="password" class="font-medium">Password</label>
      <input type="password" name="password" id="password" required
             class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  
      <button type="submit" 
              class="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition">
        Login
      </button>
  
      {#if form}
        <Warning message={form.message} />
      {/if}
    </form>
  </div>
  