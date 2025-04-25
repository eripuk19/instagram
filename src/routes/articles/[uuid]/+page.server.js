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