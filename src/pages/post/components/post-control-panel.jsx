import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../action';
import { Icon } from '../../../shared';
import { useServerRequest } from '../../../hooks';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Option = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
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
			<div className='calendarWrapper'>
				<Icon id='fa-calendar-o' size='1.2rem' />
				<span>{publishedAt}</span>
			</div>
			<div className='optionsWrapper'>
				<Option onClick={() => handler()}>
					{children}
					<Icon id={iconId} size='1.4rem' />
				</Option>
				<Option onClick={() => onRemovePost(id)}>
					Удалить
					<Icon id='fa-trash-o' size='1.4rem' />
				</Option>
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
	.calendarWrapper {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.optionsWrapper {
		display: flex;
		gap: 20px;
	}
`;
