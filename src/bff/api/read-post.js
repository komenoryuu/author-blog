import { transformPost } from '../transformers';

export const readPost = async (postId) =>
	fetch(`http://localhost:5000/posts/${postId}`)
		.then((response) => {
			if (response.ok) return response;

			const error =
				response.status === 404
					? 'Страница не найдена'
					: 'Что-то пошло не так, повторите запрос позднее...';

			return Promise.reject(error);
		})
		.then((post) => post.json())
		.then((post) => post && transformPost(post));
