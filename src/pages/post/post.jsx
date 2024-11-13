import { useEffect } from 'react';
import { useMatch, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { loadPostAsync } from '../../action';
import { selectPost } from '../../selectors';
import { Comments } from './comments';
import { PostForm } from './post-form';
import { PostContent } from './post-content';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const isEditing = useMatch('/post/:id/edit');
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);

	return (
		<div className={className}>
			{isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	min-width: 100%;
	align-self: flex-start;
`;
