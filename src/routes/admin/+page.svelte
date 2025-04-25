<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	import { slide } from 'svelte/transition';
	export let data;
	export let form;
</script>

<div class="flex justify-between items-center mt-6 mb-4 px-4">
	<h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
	<div class="flex space-x-3">
    <a
			href="/admin/new"
			class="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-purple-100 transition"

		>
			Add Article
		</a>
		<form action="/logout?/logout" method="POST" class="inline-block">
			<button
				type="submit"
        class="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
			>
				Logout
			</button>
		</form>
		
	</div>
</div>

<div class="px-4 mb-4">
	<a href="/" class="text-blue-600 hover:underline text-sm">← Back Home</a>
</div>

{#if form && !form.success}
	<div class="bg-red-100 text-red-700 p-3 mx-4 mb-4 rounded-md border border-red-300">
		{form.message}
	</div>
{/if}

<div class="space-y-4 px-4">
	{#each data.articles as article}
		<div class="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
			<img
				src="{article.image}"
				alt="uploaded"
				class="w-full sm:w-32 h-32 object-cover rounded-md border"
			/>

			<div class="flex-1 space-y-1">
				<p class="text-gray-800 font-semibold">{article.description}</p>
				<p class="text-gray-500 text-sm">Author: {article.author}</p>
				<p class="text-gray-500 text-sm">Votes: {article.votes}</p>
				<p class="text-gray-400 text-xs">ID: {article.id}</p>
			</div>

			<form action="?/deleteArticle" method="POST" class="shrink-0">
				<input type="hidden" name="id" value="{article.id}" />
				<button
					type="submit"
					class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
				>
					Delete
				</button>
			</form>
		</div>
	{/each}
</div>