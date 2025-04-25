import mysql from 'mysql2/promise';

// Import database connection details from environment variables
import { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } from '$env/static/private';

// Function to create a MySQL database connection
export async function createConnection() {
    // Create and return a connection to the MySQL database using provided connection details
    return mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        port: DB_PORT,
        password: DB_PASSWORD,
        database: DB_NAME
    });
}