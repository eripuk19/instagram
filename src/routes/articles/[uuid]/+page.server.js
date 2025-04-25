import { createConnection } from '$lib/db/mysql';
import { redirect,fail } from '@sveltejs/kit';

export async function load({ params }) {
    const { uuid } = params;

    let connection = await createConnection();
    let [rows] = await connection.execute('SELECT * FROM articles where id = ?', [uuid]);
    let [comments] = await connection.execute('SELECT * FROM comments where article_id = ?', [uuid]);

    return {
        articles: rows,
        comments: comments
    };
};

export const actions = {

    upvoteImage: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'Error while upvoting' };
		}
	},

    commentImage: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('article_id');
        const comment = formData.get('comment');
        const username = formData.get('username');

        const connection = await createConnection();
        const [result] = await connection.execute(
            'INSERT INTO comments (article_id, text, name) VALUES (?, ?, ?)',
            [id, comment, username]
        );

        if (result.affectedRows) {
            return { success: true };
        } else {
            return { error: 'Error while commentig' };
        }
    }
};
