import { requiest } from '../../utils'

export const removePostAsync = postId => () => requiest(`/api/posts/${postId}`, 'DELETE')
