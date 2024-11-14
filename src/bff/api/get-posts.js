import { transformPost } from '../transformers';

export const getPosts = async () =>
	fetch(`http://localhost:5000/posts`)
		.then((posts) => posts.json())
		.then((posts) => posts && posts.map(transformPost));
