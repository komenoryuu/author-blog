import { transformPost } from '../transformers';

export const getPosts = async (page, limit, searchPhrase) =>
	fetch(
		`http://localhost:5000/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((posts) => Promise.all([posts.json(), posts.headers.get('Link')]))
		.then(([posts, links]) => ({
			posts: posts && posts.map(transformPost),
			links,
		}));
