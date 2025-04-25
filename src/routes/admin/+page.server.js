import { createConnection } from '$lib/db/mysql';
import { redirect,fail } from '@sveltejs/kit';

// Load function to check if the user has 'admin' role and fetch all articles from the database
export async function load({locals}) {
	// Check if user is logged in and has 'admin' role
	if (!locals.user || locals.user.role !== 'admin'){
		// Redirect non-admin users to the login page
		redirect(302, '/login');
	}

	// Establish a connection to the MySQL database
	let connection = await createConnection();

	// Retrieve all articles from the 'articles' table
	let [rows] = await connection.execute('SELECT * FROM articles');

	// Return the articles data to the component or page
	return {
		articles: rows
	};
}

// Actions object containing the deleteArticle function to handle article deletion
export const actions = {
	// Function to delete an article by its ID
	deleteArticle: async ({ request }) => {
		// Retrieve form data submitted with the request
		const formData = await request.formData();
		// Get the article ID from the form data
		const id = formData.get('id');
		
		// Establish a connection to the MySQL database
		const connection = await createConnection();
		
		try {
			// Execute the DELETE query to remove the article with the specified ID
			const [result] = await connection.execute('DELETE FROM articles WHERE id=?', [id]);
		} catch (e) {
			// Log any errors that occur during deletion
			console.error(e);
			// Return a failure response if deletion is not possible
			return {
				success: false,
				message: 'Deletion not possible!'
			};
		}
	}
};