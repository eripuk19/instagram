import { createConnection } from '$lib/db/mysql';
import {BASIC_AUTH_USER, BASIC_AUTH_PASSWORD} from '$env/static/private';
 

// GET request handler to fetch all articles from the database
export async function GET() {
    // Establish a connection to the MySQL database
    let connection = await createConnection();
    
    // Retrieve all articles from the 'articles' table
    let [rows] = await connection.execute('SELECT * FROM articles');
    
    // Close the database connection
    await connection.end();

    // Return the list of articles as a JSON response with a 200 status
    return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// Function to handle basic authentication using provided credentials
async function auth(request) {
    const auth = request.headers.get('authorization');  // Retrieve the 'Authorization' header from the request
    
    // If the 'Authorization' header is missing or invalid, return a 401 error
    if (!auth || auth !== `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`)}`) {
        return new Response(null, {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }  // Prompt for authentication
        });
    }

    // Decode the base64-encoded credentials
    const base64Credentials = auth.split(' ')[1];
    const credentials = atob(base64Credentials);
    
    // Split the credentials into username and password
    const [username, password] = credentials.split(':');
    
    // If the credentials are incorrect, return a 401 error with an access denied message
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }  // Prompt for authentication again
        });
    }

    // Return null if authentication is successful
    return null;
}

// POST request handler to create a new article in the database
export async function POST({ request }) {
    // Perform authentication before processing the request
    const authResponse = await auth(request);
    if (authResponse) return authResponse;

    // Establish a connection to the MySQL database
    let connection = await createConnection();
    
    // Get the data sent in the request body as JSON
    const data = await request.json();

    // Check if required fields (image, description, author, votes) are provided
    if (!data.image || !data.description || !data.author || !data.votes) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Insert the new article into the 'articles' table
    await connection.execute('INSERT INTO articles (image, description, author, votes) VALUES (?,?,?,?)', 
        [data.image, data.description, data.author, data.votes]);

    // Close the database connection
    await connection.end();

    // Return the created article as a JSON response with a 201 status (created)
    return new Response(JSON.stringify(data), {
        status: 201,
        headers: { 'content-type': 'application/json' }
    });
}