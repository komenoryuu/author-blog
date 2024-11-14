import { generateDate } from '../utils';

export const createPost = ({ title, imageUrl, content }) =>
	fetch('http://localhost:5000/posts', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title,
			image_url: imageUrl,
			content,
			published_at: generateDate(),
		}),
	}).then((createdPost) => createdPost.json());
