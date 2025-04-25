<script>
	import { enhance } from '$app/forms';
	export let data;
</script>

<a href="/" class="text-indigo-600 hover:underline text-sm ml-4 mb-8 inline-block">← Back to Home</a>

<div class="space-y-12 px-4 max-w-6xl mx-auto">
	{#each data.articles as article}
		<div class="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
			<div class="md:flex md:items-start">
				<img src="{article.image}" alt="uploaded" class="w-full md:w-64 h-64 object-cover md:rounded-l-3xl" />

				<div class="p-6 flex-1 space-y-4">
					<h2 class="text-2xl font-bold text-gray-900">{article.author}</h2>
					<p class="text-gray-600 leading-relaxed">{article.description}</p>

					<div class="flex items-center gap-4 mt-4">
						<p class="text-sm text-gray-700 font-medium">Likes: {article.votes}</p>
						<form action="?/upvoteImage" method="POST" use:enhance>
							<input type="hidden" name="id" value={article.id} />
							<button type="submit" aria-label="like" class="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 hover:scale-110 transition-transform duration-200">
								<img src="https://99cjakqnnrlcgkh9.public.blob.vercel-storage.com/projekt/upvote-5lecHC1UpTX9MIBrSFk1jcb6yabUZj.png" alt="upvote" class="w-5 h-5" />
							</button>
						</form>
					</div>

					<div class="pt-6 border-t border-gray-200">
						<h3 class="text-lg font-semibold text-gray-800 mb-3">Comments</h3>

						<div class="space-y-2 max-h-32 overflow-y-auto pr-2 text-sm text-gray-700">
							{#each data.comments.filter(c => c.article_id === article.id) as comment}
								<p><span class="font-semibold">{comment.name}:</span> {comment.text}</p>
							{/each}
						</div>

						<form action="?/commentImage" method="POST" use:enhance class="mt-5 space-y-3">
							<input type="hidden" name="article_id" value={article.id} />

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1" for="username">Name</label>
								<input type="text" name="username" required class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1" for="comment">Comment</label>
								<textarea name="comment" required rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"></textarea>
							</div>

							<button type="submit" class="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition">
								Add Comment
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>