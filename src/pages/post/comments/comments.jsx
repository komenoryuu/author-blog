import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../hooks';
import { addCommentAsync } from '../../../state/action';
import { selectRole, selectUserId } from '../../../state/selectors';
import { H2, Icon } from '../../../shared';
import { Comment } from './comment';
import { PROP_TYPE, ROLE } from '../../../constants';
import styled from 'styled-components';

const SendComment = styled.div`
	cursor: pointer;
	transition: all 0.2s;
	&:hover {
		color: #7f56d9;
	}
`;

const LeaveCommentArea = styled.textarea`
	resize: none;
	height: 150px;
	width: 100%;
	font-size: 1.1rem;
	padding: 8px;
	border: 2px solid #000;
	border-radius: 8px;
	outline: none;
	&:focus {
		border: 2px solid #7f56d9;
	}
`;

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const currentRole = useSelector(selectRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const isUserAuthorize = currentRole !== ROLE.GUEST;

	const onLeaveComment = (postId, userId, content) => {
		if (!newComment) return;

		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div>
				<H2 size='2rem'>Комментарии</H2>
				{isUserAuthorize && (
					<div className='leaveComment'>
						<LeaveCommentArea
							name='leaveComment'
							value={newComment}
							placeholder='Оставьте комментарий...'
							onChange={({ target }) =>
								setNewComment(target.value)
							}
						/>
						<SendComment
							onClick={() =>
								onLeaveComment(postId, userId, newComment)
							}
						>
							<Icon id='fa-check-square-o' size='1.5rem' />
						</SendComment>
					</div>
				)}
				<div className='comment'>
					{comments.map(({ author, content, id, publishedDate }) => (
						<Comment
							key={id}
							id={id}
							postId={postId}
							author={author}
							publishedDate={publishedDate}
							content={content}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	& > div {
		width: 70%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.leaveComment {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 15px;
		}

		.comment {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENTS).isRequired,
	postId: PropTypes.string.isRequired,
};
