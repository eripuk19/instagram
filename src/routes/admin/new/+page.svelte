<h1 class="bg-antiquewhite p-4 text-xl font-bold text-center rounded-md shadow-md">
	Add New Articles
  </h1>

  <a href="/admin">Back to Admin</a>
  
  <form method="POST" action="?/createArticle" enctype="multipart/form-data" class="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-80 mx-auto mt-6">
    <input type="file" name="image" class="border border-black p-2">
    <button type="submit" class="border border-black p-2">
        Upload an image
    </button>
	<label for="description" class="font-medium">Description</label>
	<textarea type="text" placeholder="Description" name="description" 
		   class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
  
	<label for="author" class="font-medium">Author</label>
	<input placeholder="Author" name="author" 
			  class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24" required/>
  
	<button type="submit" 
			class="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition">
	  Add Article
	</button>
  </form>
  