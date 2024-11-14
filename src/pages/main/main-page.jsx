import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './post-card';
import { H2, Loader } from '../../shared';
import styled from 'styled-components';

const MainPageContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const requestServer = useServerRequest();
	const isLoadingData = posts.length === 0;

	useEffect(() => {
		requestServer('fetchPosts').then((posts) => setPosts(posts.response));
	}, [requestServer]);

	return (
		<div className={className}>
			{isLoadingData ? (
				<Loader />
			) : (
				<>
					<H2>Все статьи блога</H2>
					<div>
						{posts.map(
							({
								id,
								title,
								imageUrl,
								publishedAt,
								commentsCount,
							}) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				</>
			)}
		</div>
	);
};

export const MainPage = styled(MainPageContainer)`
	text-align: center;
	max-width: 80%;
	div {
		display: flex;
		justify-content: center;
		gap: 32px;
		flex-wrap: wrap;
	}
`;
