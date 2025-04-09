import { createConnection } from '$lib/db/mysql';
import { redirect,fail } from '@sveltejs/kit';

export async function load({locals}) {

	if (!locals.user || locals.user.role !== 'admin'){
		redirect(302, '/login');
	}

	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');

	return {
		articles: rows
	};
}

export const actions = {
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();
		try {
			const [result] = await connection.execute('DELETE FROM articles WHERE id=?', [id]);
		} catch (e) {
			console.error(e);
			return {
				success: false,
				message: 'Deletion not possible!'
			};
		}
	}
};
