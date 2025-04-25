import { createConnection } from '$lib/db/mysql';
import {BASIC_AUTH_USER, BASIC_AUTH_PASSWORD} from '$env/static/private';
 
 
// GET request handler to fetch an article by its ID (uuid)
export async function GET({ params }) {
    // Establish a connection to the MySQL database
    const connection = await createConnection();
    const { uuid } = params;  // Extract the 'uuid' from route parameters

    // Retrieve the article with the specified ID from the database
    const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [uuid]);
    
    // Close the database connection
    await connection.end();

    // If the article is not found, return a 404 error with a message
    if (rows.length === 0) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    // If the article is found, return it as JSON with a 200 status
    return new Response(JSON.stringify(rows[0]), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// Function to handle basic authentication using provided credentials
async function auth(request) {
    const auth = request.headers.get('authorization');  // Retrieve the 'Authorization' header from the request
    
    // Check if the authorization header is missing or invalid
    if (!auth || auth !== `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`)}`) {
        return new Response(null, {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }  // Prompt for authentication
        });
    }

    const base64Credentials = auth.split(' ')[1];  // Extract the base64-encoded credentials
    const credentials = atob(base64Credentials);  // Decode the credentials
    const [username, password] = credentials.split(':');  // Split the username and password

    // If the credentials are invalid, return a 401 error
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }  // Prompt for authentication again
        });
    }

    // Return null if authentication is successful
    return null;
}

// PUT request handler to update an article's details by its ID (uuid)
export async function PUT({ params, request }) {
    // Perform authentication before processing the request
    const authResponse = await auth(request);
    if (authResponse) return authResponse;

    // Establish a connection to the MySQL database
    const connection = await createConnection();
    const { uuid } = params;  // Extract the 'uuid' from route parameters
    const data = await request.json();  // Get the data sent in the request body

    // Define the allowed fields for updating
    const allowedFields = ['image', 'description', 'author', 'votes'];
    const updates = [];  // Array to hold the update queries
    const values = [];  // Array to hold the values to be updated

    // Loop through allowed fields and check if they are provided in the request data
    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updates.push(`${field} = ?`);  // Add the field to the update query
            values.push(data[field]);  // Add the corresponding value
        }
    }

    // If no fields were provided for updating, return a 400 error
    if (updates.length === 0) {
        return new Response(JSON.stringify({ error: "No data to update" }), { status: 400 });
    }

    values.push(uuid);  // Add the article UUID to the values array for the WHERE condition

    // Create the SQL query string for updating the article
    const query = `UPDATE articles SET ${updates.join(', ')} WHERE id = ?`;

    // Execute the query to update the article
    const [result] = await connection.execute(query, values);

    // Close the database connection
    await connection.end();

    // If no rows were affected, return a 404 error indicating the article was not found
    if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    // Return a success message if the article was updated successfully
    return new Response(JSON.stringify({ message: "Article updated successfully" }), { status: 200 });
}

// DELETE request handler to delete an article by its ID (uuid)
export async function DELETE({ params, request }) {
    // Perform authentication before processing the request
    const authResponse = await auth(request);
    if (authResponse) return authResponse;

    // Establish a connection to the MySQL database
    const connection = await createConnection();
    const { uuid } = params;  // Extract the 'uuid' from route parameters

    // Execute the DELETE query to remove the article with the specified ID
    await connection.execute('DELETE FROM articles WHERE id = ?', [uuid]);

    // Close the database connection
    await connection.end();

    // Return a 204 status indicating successful deletion with no content
    return new Response(null, { status: 204 });
}