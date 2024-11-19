import { setPostData } from './set-post-data';

export const removeCommentAsync =
	(requestServer, postId, commentId) => (dispatch) => {
		requestServer('removeComment', postId, commentId).then((postData) => {
			dispatch(setPostData(postData.response));
		});
	};
