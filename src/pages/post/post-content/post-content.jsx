import styled from 'styled-components';
import { PostControlPanel } from '../components/post-control-panel';
import { useNavigate } from 'react-router';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	const onNavigate = () => navigate(`/post/${id}/edit`);

	return (
		<div className={className}>
			<img src={imageUrl} alt='post_image' />
			<h3>{title}</h3>
			<PostControlPanel
				publishedAt={publishedAt}
				iconId={'fa-pencil-square-o'}
				handler={onNavigate}
			>
				Редактировать
			</PostControlPanel>
			<p>{content}</p>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	margin: 0 auto;
	max-width: 70%;
	margin-bottom: 24px;
	& > img {
		float: left;
		margin: 0px 24px 10px 0px;
	}
	& > h3 {
		font-size: 1.8rem;
		margin-bottom: 24px;
	}
	& > p {
		font-size: 1.2rem;
		white-space: pre-line;
	}
`;
