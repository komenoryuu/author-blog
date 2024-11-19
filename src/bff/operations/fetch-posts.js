import { readComments, readPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (page, limit, searchPhrase) => {
	const [{ posts, links }, comments] = await Promise.all([
		readPosts(page, limit, searchPhrase),
		readComments(),
	]);

	return {
		error: null,
		response: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			links,
		},
	};
};
