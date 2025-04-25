<script>
	import { enhance } from "$app/forms";
	import Warning from "$lib/components/Warning.svelte";
	export let form;
</script>

<div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-white">
	<form action="?/login" method="POST" use:enhance
		class="bg-white px-8 py-6 rounded-2xl shadow-xl w-full max-w-sm space-y-5">
		
		<h1 class="text-2xl font-bold text-center text-gray-800">Log In</h1>
    
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
			<input
				type="text"
				name="email"
				id="email"
				required
				placeholder="E-Mail"
				class="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				placeholder="Password"
				class="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<button
			type="submit"
			class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition duration-200"
		>
			Log In
		</button>

		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>
</div>