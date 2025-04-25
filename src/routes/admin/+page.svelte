<script>
    import { enhance } from '$app/forms';
    import Warning from '$lib/components/Warning.svelte';
    import { slide } from 'svelte/transition';
    export let data;
    export let form;
  </script>
  
  <div class="mt-4 space-x-4">
    <form action="/logout?/logout" method="POST" class="inline-block">
        <button type="submit" class="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-100">Logout</button>
    </form>
</div>

  <header class="bg-antiquewhite p-4 rounded-md shadow-md flex justify-between items-center">
    <h1 class="text-lg font-bold">Admin Dashboard</h1>
    <a href="/admin/new" 
       class="bg-orange-200 text-black px-4 py-2 rounded-md hover:bg-orange-300 transition">
      Add Article
    </a>
  </header>

  <a href="/">Back Home</a>
  
  {#if form && !form.success}
    <div class="bg-red-100 text-red-700 p-3 my-2 rounded-md border border-red-300">
      {form.message}
    </div>
  {/if}
  
  {#each data.articles as article}
    <div class="border border-gray-300 p-4 my-2 rounded-md shadow-sm flex justify-between items-center">
        <img src="{article.image}" alt="uploaded" class="w-114"/>

      <p class="text-gray-800 font-medium">{article.id} -{article.description} - {article.author} -{article.votes} </p>
  
      <form action="?/deleteArticle" method="POST">
        <input type="hidden" name="id" value="{article.id}" />
        <button type="submit" 
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
          Delete article
        </button>
      </form>
    </div>
  {/each}
  