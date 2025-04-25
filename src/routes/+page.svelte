<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	import { slide } from 'svelte/transition';
	export let data;
</script>

<h1 class="text-5xl font-bold text-center text-slate-800 mt-16 mb-12 tracking-tight">Insta Clone</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
	{#each data.articles as article}
		<div class="bg-white border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
			<a href={`articles/${article.id}`}>
				<img src="{article.image}" alt="uploaded" class="w-full h-60 object-cover transition-transform duration-300 hover:scale-105" />
			</a>
			<div class="p-6 space-y-3">
				<div>
					<p class="text-slate-900 font-medium text-lg">{article.author}</p>
					<p class="text-slate-500 text-sm">❤️ {article.votes} Likes</p>
				</div>
				<a href={`articles/${article.id}`} class="inline-block text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors duration-200">
					View Post →
				</a>
			</div>
		</div>
	{/each}
</div>
