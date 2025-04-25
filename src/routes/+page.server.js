import { createConnection } from '$lib/db/mysql';
import { redirect, fail } from '@sveltejs/kit';

// Load function to fetch articles and user data from the server
export async function load() {

    // Establish a connection to the MySQL database
    let connection = await createConnection();
    
    // Retrieve all articles from the 'articles' table
    let [rows] = await connection.execute('SELECT * FROM articles');

    // Return the fetched articles
    return {
        articles: rows,  // The fetched articles from the database
    };
};