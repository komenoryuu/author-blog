import { requiest } from '../../utils'
import { setPostData } from './set-post-data'

export const savePostAsync = (id, newPostData) => dispatch => {
	const saveRequest = id
		? requiest(`/api/posts/${id}`, 'PATCH', newPostData)
		: requiest('/api/posts', 'POST', newPostData)

	return saveRequest.then(post => {
		dispatch(setPostData(post.data))

		return post.data
	})
}
