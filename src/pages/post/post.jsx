import { useEffect, useLayoutEffect } from 'react';
import { useMatch, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../action';
import { selectPost } from '../../selectors';
import { Comments } from './comments';
import { PostForm } from './post-form';
import { PostContent } from './post-content';
import styled from 'styled-components';
import { Loader } from '../../shared';

const PostContainer = ({ className }) => {
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const isLoadingData = post.id === '';

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) return;

		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer, isCreating]);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post} />
			) : isLoadingData ? (
				<div className='loaderWrapper'>
					<Loader />
				</div>
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
	.loaderWrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
`;
