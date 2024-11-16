import { useEffect, useLayoutEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../action';
import { selectPost } from '../../selectors';
import { Comments } from './comments';
import { PostForm } from './post-form';
import { PostContent } from './post-content';
import { Loader } from '../../shared';
import { ErrorPage, AccessDeniedPage } from '../../components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();

	const [error, setError] = useState(null);
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');
	const post = useSelector(selectPost);

	const isLoadingData = post.id === '';

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) return;

		dispatch(loadPostAsync(requestServer, params.id)).then((postData) =>
			setError(postData.error),
		);
	}, [dispatch, params.id, requestServer, isCreating]);

	const AdminPage = (
		<AccessDeniedPage access={[ROLE.ADMIN]} serverError={error}>
			<PostForm post={post} />
		</AccessDeniedPage>
	);

	const UserPage = isLoadingData ? (
		<Loader />
	) : (
		<>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</>
	);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				AdminPage
			) : error ? (
				<ErrorPage error={error} />
			) : (
				UserPage
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
