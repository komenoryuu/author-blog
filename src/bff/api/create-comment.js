import { generateDate } from '../utils';

export const createComment = (postId, userId, content) =>
	fetch('http://localhost:5000/comments', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			post_id: postId,
			author_id: userId,
			published_date: generateDate(),
			content,
		}),
	});
