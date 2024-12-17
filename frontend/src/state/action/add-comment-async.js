import { requiest } from '../../utils'
import { addComment } from './add-comment'

export const addCommentAsync = (postId, content) => dispatch => {
	requiest(`/api/posts/${postId}/comments`, 'POST', { content }).then(commentData => {
		dispatch(addComment(commentData.data))
	})
}
