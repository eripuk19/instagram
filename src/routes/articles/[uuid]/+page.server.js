import { createConnection } from '$lib/db/mysql';
import { redirect,fail } from '@sveltejs/kit';

// Load function to fetch the article and its comments based on the article ID (uuid)
export async function load({ params }) {
    // Destructure the 'uuid' from route parameters
    const { uuid } = params;

    // Establish a connection to the MySQL database
    let connection = await createConnection();
    
    // Retrieve the article data by its ID (uuid)
    let [rows] = await connection.execute('SELECT * FROM articles where id = ?', [uuid]);
    
    // Retrieve the comments for the specific article
    let [comments] = await connection.execute('SELECT * FROM comments where article_id = ?', [uuid]);

    // Return both the article and its comments data to the component or page
    return {
        articles: rows,
        comments: comments
    };
};

// Actions object containing upvoteImage and commentImage functions
export const actions = {

    // Function to upvote an article by incrementing its vote count
    upvoteImage: async ({ request }) => {
        // Retrieve form data from the request
        const formData = await request.formData();
        
        // Get the article ID from the form data
        const id = formData.get('id');

        // Establish a connection to the MySQL database
        const connection = await createConnection();
        
        // Update the vote count of the article with the specified ID
        const [result] = await connection.execute(
            'UPDATE articles SET votes = votes + 1 WHERE id = ?',
            [id]
        );

        // If the update was successful, return a success response
        if (result.affectedRows) {
            return { success: true };
        } else {
            // Return an error message if upvoting failed
            return { error: 'Error while upvoting' };
        }
    },

    // Function to add a comment to an article
    commentImage: async ({ request }) => {
        // Retrieve form data from the request
        const formData = await request.formData();
        
        // Get article ID, comment text, and username from the form data
        const id = formData.get('article_id');
        const comment = formData.get('comment');
        const username = formData.get('username');

        // Establish a connection to the MySQL database
        const connection = await createConnection();
        
        // Insert the new comment into the 'comments' table for the specified article
        const [result] = await connection.execute(
            'INSERT INTO comments (article_id, text, name) VALUES (?, ?, ?)',
            [id, comment, username]
        );

        // If the comment was successfully inserted, return a success response
        if (result.affectedRows) {
            return { success: true };
        } else {
            // Return an error message if commenting failed
            return { error: 'Error while commenting' };
        }
    }
};