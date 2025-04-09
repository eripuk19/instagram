<script>
    import { enhance } from '$app/forms';
    import Warning from '$lib/components/Warning.svelte';
    import { slide } from 'svelte/transition';
    export let data;
  </script>
  <h1> insta clone</h1>
  
  {#each data.articles as article}
    <div class="border border-gray-300 p-4 my-2 rounded-md shadow-sm flex justify-between items-center">
        <img src="{article.image}" alt="uploaded" class="w-114"/>
      <p class="text-gray-800 font-medium">{article.author} -{article.votes} </p>
    </div>
  {/each}
  