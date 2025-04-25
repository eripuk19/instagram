import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Load function to check if the user has 'admin' role, otherwise redirect to login page
export async function load({locals}) {
	// Check if user is logged in and has 'admin' role
	if (!locals.user || locals.user.role !== 'admin'){
		// Redirect non-admin users to the login page
		redirect(302, '/login');
	}
}

// Actions object containing the createArticle function
export const actions = {
	// Function to handle the creation of a new article
	createArticle: async ({ request }) => {
		// Retrieve form data submitted with the request
		const formData = await request.formData();
		console.log(formData);  // Log form data for debugging purposes

        // Retrieve the uploaded image from the form data
        const uploadedImage = formData.get("image");
        
        // Upload the image to blob storage and get the public URL for the image
        const { url } = await put('projekt/'+uploadedImage.name, uploadedImage, { access: "public" ,token: BLOB_READ_WRITE_TOKEN});

		// Establish a connection to the MySQL database
		const connection = await createConnection();
		
		// Insert the article details into the 'articles' table
		const [result] = await connection.execute('INSERT INTO articles (image,description, author) VALUES (?,?,?)', [
            url,  // The URL of the uploaded image
			formData.get('description'),  // Article description from the form
			formData.get('author')  // Article author from the form
		]);

		// Check if the insertion was successful
		if (result.affectedRows) {
			// Redirect to the admin page if the article was successfully created
			redirect(303, '/admin');
		}
	}
};
