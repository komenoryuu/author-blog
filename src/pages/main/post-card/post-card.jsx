import { Link } from 'react-router-dom';
import { IconWithText } from '../../../shared';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img className='postImage' src={imageUrl} alt='postImage' />
				<IconWithText iconId='fa-calendar-o' content={publishedAt} />
				<h4>{title}</h4>
				<div className='comments'>Комментариев: {commentsCount}</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	max-width: 384px;
	& > a {
		text-align: start;
		.postImage {
			margin-bottom: 6px;
		}
		h4 {
			margin-top: 3px;
			font-size: 1.2rem;
		}
		.comments {
			color: #667085;
		}
	}
`;
