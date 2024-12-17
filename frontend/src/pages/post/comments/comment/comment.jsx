import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { removeCommentAsync, openModal, CLOSE_MODAL } from '../../../../state/action'
import { selectRole } from '../../../../state/selectors'
import { Icon, IconWithText } from '../../../../shared'
import { ROLE } from '../../../../constants'
import styled from 'styled-components'

const CommentContainer = ({ className, id, postId, author, publishedDate, content }) => {
	const dispatch = useDispatch()
	const currentRole = useSelector(selectRole)

	const isAdminOrModer = [ROLE.ADMIN, ROLE.MODER].includes(currentRole)

	const onRemoveComment = commentId => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, commentId))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	return (
		<div className={className}>
			<div className='comment'>
				<div className='userInfo'>
					<IconWithText
						iconId='fa-user-o'
						content={author}
					/>
					<div style={{ fontWeight: 400 }}>
						<IconWithText
							iconId='fa-calendar-o'
							content={publishedDate}
						/>
					</div>
				</div>
				<p>{content}</p>
			</div>
			{isAdminOrModer && (
				<div
					className='deleteComment'
					onClick={() => onRemoveComment(id)}>
					<Icon
						id='fa-trash-o'
						size='1.5rem'
					/>
				</div>
			)}
		</div>
	)
}

export const Comment = styled(CommentContainer)`
	display: flex;
	align-items: center;
	gap: 8px;
	.comment {
		border: 2px solid #7f56d9;
		border-radius: 8px;
		padding: 12px;
		font-size: 1.1rem;
		.userInfo {
			display: flex;
			justify-content: space-between;
			margin-bottom: 8px;
			font-weight: 600;
		}
	}
	.deleteComment {
		cursor: pointer;
		transition: all 0.2s;
		&:hover {
			color: #7f56d9;
		}
	}
`

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedDate: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}
