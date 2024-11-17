import { useNavigate } from 'react-router';
import { PostControlPanel } from '../components/post-control-panel';
import { H3 } from '../../../shared';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedDate },
}) => {
	const navigate = useNavigate();

	const onNavigate = () => navigate(`/post/${id}/edit`);

	return (
		<div className={className}>
			<img src={imageUrl} alt='post_image' />
			<H3 margin='24px'>{title}</H3>
			<PostControlPanel
				id={id}
				publishedDate={publishedDate}
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
		max-width: 384px;
		max-height: 240px;
	}
	& > p {
		font-size: 1.2rem;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
