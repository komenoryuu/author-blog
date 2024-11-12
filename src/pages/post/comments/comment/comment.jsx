import { Icon } from '../../../../shared';
import styled from 'styled-components';

const UserInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 8px;
	.userWrapper {
		display: flex;
		gap: 8px;
		align-items: center;
		font-weight: 600;
	}
	.dateWrapper {
		display: flex;
		gap: 8px;
		align-items: center;
	}
`;

const CommentContainer = ({ className, author, publishedAt, content }) => {
	return (
		<div className={className}>
			<div className='comment'>
				<UserInfo>
					<div className='userWrapper'>
						<Icon id='fa-user-o' />
						<span>{author}</span>
					</div>
					<div className='dateWrapper'>
						<Icon id='fa-calendar-o' />
						<span>{publishedAt}</span>
					</div>
				</UserInfo>
				<p>{content}</p>
			</div>
			<div className='deleteComment'>
				<Icon id='fa-trash-o' size='1.5rem' />
			</div>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	align-items: center;
	gap: 8px;
	.comment {
		border: 2px solid #7f56d9;
		border-radius: 8px;
		padding: 12px;
		font-size: 1.1rem;
	}
	.deleteComment {
		cursor: pointer;
		transition: all 0.2s;
		&:hover {
			color: #7f56d9;
		}
	}
`;
