<script>
    import { enhance } from '$app/forms';
    import Warning from '$lib/components/Warning.svelte';
    import { slide } from 'svelte/transition';
    export let data;
  </script>
<a href="/">Back</a>
  
  {#each data.articles as article}
    <div class="border border-gray-300 p-4 my-2 rounded-md shadow-sm flex justify-between items-center">
        <img src="{article.image}" alt="uploaded" class="w-114"/>
      <p class="text-gray-800 font-medium">{article.author} - {article.description} </p>
      <form action="?/upvoteImage" method="POST" use:enhance>
        <input type="hidden" name="id" value={article.id} />
        <button type="submit" aria-label="like" class="w-11 h-10 hover:scale-110 transition-transform duration-200">
            <img src="https://99cjakqnnrlcgkh9.public.blob.vercel-storage.com/projekt/upvote-5lecHC1UpTX9MIBrSFk1jcb6yabUZj.png" alt="upvote" />
        </button>
    </form>
      <p>Likes: {article.votes} </p>

      <div>
        <h4>Comments</h4>
        <div>
            {#each data.comments as comment}
                <p>
                    <span>{comment.name}:</span> {comment.text}
                </p>
            {/each}
        </div>

        <form action="?/commentImage" method="POST" use:enhance>
            <input type="hidden" name="article_id" value={article.id} />
            
            <div>
                <label for="username">Name</label>
                <input type="text" name="username" required/>
            </div>

            <div>
                <label for="comment">Comment</label>
                <textarea name="comment" required></textarea>
            </div>

            <button type="submit">Add Comment</button>
        </form>
    </div>
    </div>
  {/each}
  