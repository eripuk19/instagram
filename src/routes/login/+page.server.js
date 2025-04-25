import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

// Define actions related to user login
export const actions = {
    // Login action handler
    login: async ({ request, cookies }) => {
        // Retrieve form data from the request (email and password)
        const formData = await request.formData();
        const email = formData.get('email');  // Get the email entered in the login form
        const password = formData.get('password');  // Get the password entered in the login form

        // Call the login function with the email and password, returning a token if successful
        const token = await login(email, password);

        // If the login is successful and a token is returned
        if (token) {
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7,  // Cookie expires after 7 days
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });
            // Redirect the user to the admin page
            redirect(302, '/admin');
        } else {
            // If login fails
            return {
                success: false,
                message: 'Login failed'  // Provide an error message when login fails
            };
        }
    }
};
