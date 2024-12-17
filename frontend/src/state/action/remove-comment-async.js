import { removeComment } from './remove-comment'
import { requiest } from '../../utils'

export const removeCommentAsync = (postId, commentId) => dispatch => {
	requiest(`/api/posts/${postId}/comments/${commentId}`, 'DELETE').then(() => {
		dispatch(removeComment(commentId))
	})
}
