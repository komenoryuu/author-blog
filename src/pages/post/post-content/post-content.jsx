import { Icon } from '../../../shared';
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

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt='post_image' />
			<h3>{title}</h3>
			<div>
				<div className='calendarWrapper'>
					<Icon id='fa-calendar-o' size='1.2rem' />
					<span>{publishedAt}</span>
				</div>
				<div className='optionsWrapper'>
					<Option>
						Редактировать
						<Icon id='fa-pencil-square-o' size='1.4rem' />
					</Option>
					<Option>
						Удалить
						<Icon id='fa-trash-o' size='1.4rem' />
					</Option>
				</div>
			</div>
			<p>{content}</p>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	margin-bottom: 24px;
	& > img {
		float: left;
		margin: 0px 24px 10px 0px;
	}
	& > h3 {
		font-size: 1.8rem;
		margin-bottom: 24px;
	}
	& > div {
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
	}
	& > p {
		font-size: 1.2rem;
	}
`;
