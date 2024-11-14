import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../action';
import { Icon, IconWithText } from '../../../shared';
import { useServerRequest } from '../../../hooks';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Option = styled.div`
	display: flex;
	gap: 8px;
	cursor: pointer;
	transition: all 0.2s;
	&:hover {
		color: #7f56d9;
	}
`;

const PostControlPanelContainer = ({
	className,
	id,
	publishedAt,
	iconId,
	handler,
	children,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const isNewPostPage = id === '';

	const onRemovePost = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, postId)).then(
						() => {
							navigate('/');
						},
					);

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			{!isNewPostPage && (
				<IconWithText iconId={'fa-calendar-o'} content={publishedAt} />
			)}

			<div className='optionsWrapper'>
				<Option onClick={() => handler()}>
					{children}
					<Icon id={iconId} size='1.4rem' />
				</Option>
				{!isNewPostPage && (
					<Option onClick={() => onRemovePost(id)}>
						Удалить
						<Icon id='fa-trash-o' size='1.4rem' />
					</Option>
				)}
			</div>
		</div>
	);
};

export const PostControlPanel = styled(PostControlPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	font-size: 1.2rem;
	.optionsWrapper {
		display: flex;
		gap: 20px;
	}
`;
