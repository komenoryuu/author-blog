import { ACTION_TYPE } from './action-type'
import { requiest } from '../../utils'

export const logout = () => {
	requiest('/api/logout', 'POST')

	return { type: ACTION_TYPE.LOGOUT }
}
