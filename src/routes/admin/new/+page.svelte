<h1 class="bg-slate-100 p-5 text-3xl font-bold text-center rounded-lg shadow text-slate-800">
	Add New Article
</h1>

<div class="px-4 mt-4 text-sm text-center">
	<a href="/admin" class="text-indigo-600 hover:underline">← Back to Admin</a>
</div>

<form method="POST" action="?/createArticle" enctype="multipart/form-data"
	class="bg-white p-8 mt-8 rounded-2xl shadow-lg max-w-lg mx-auto flex flex-col gap-6 border border-slate-200">

	<div>
		<label class="block text-sm font-semibold mb-2 text-slate-700" for="image">Upload Image</label>
		<input type="file" name="image"
			class="w-full border border-slate-300 rounded-md p-2 file:bg-indigo-50 file:text-indigo-700 file:font-medium file:rounded file:px-4 file:py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
	</div>

	<div>
		<label for="description" class="block text-sm font-semibold mb-2 text-slate-700">Description</label>
		<textarea name="description" placeholder="Write a short description..."
			class="w-full border border-slate-300 rounded-md p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
			required></textarea>
	</div>

	<div>
		<label for="author" class="block text-sm font-semibold mb-2 text-slate-700">Author</label>
		<input type="text" name="author" placeholder="Author name"
			class="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			required />
	</div>

	<button type="submit"
		class="bg-indigo-600 text-white font-semibold py-2.5 rounded-md hover:bg-indigo-700 transition-all shadow-sm">
		Add Article
	</button>
</form>
