import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../state/action'
import { selectRole } from '../../../state/selectors'
import { checkAccess } from '../../../utils'
import { IconWithText } from '../../../shared'
import { ROLE } from '../../../constants'
import styled from 'styled-components'

const PostControlPanelContainer = ({ className, id, publishedDate, iconId, handler, children }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentRole = useSelector(selectRole)

	const isNewPostPage = id === ''
	const isAdmin = checkAccess([ROLE.ADMIN], currentRole)

	const onRemovePost = postId => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(postId)).then(() => {
						navigate('/')
					})

					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	return (
		<div className={className}>
			{!isNewPostPage && (
				<IconWithText
					iconId={'fa-calendar-o'}
					content={publishedDate}
				/>
			)}

			{isAdmin && (
				<div className='optionsWrapper'>
					<IconWithText
						iconId={iconId}
						iconSize='1.4rem'
						content={children}
						onClick={() => handler()}
					/>
					{!isNewPostPage && (
						<IconWithText
							iconId='fa-trash-o'
							iconSize='1.4rem'
							content='Удалить'
							onClick={() => onRemovePost(id)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export const PostControlPanel = styled(PostControlPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	font-size: 1.2rem;
	.optionsWrapper {
		display: flex;
		gap: 20px;
		div {
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				color: #7f56d9;
			}
		}
	}
`

PostControlPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedDate: PropTypes.string.isRequired,
	iconId: PropTypes.string.isRequired,
	handler: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
}
