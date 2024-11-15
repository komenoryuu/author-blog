import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './post-card';
import { H2, Loader } from '../../shared';
import { Pagination } from './pagination';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils/get-last-page-from-links';
import styled from 'styled-components';

const MainPageContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const requestServer = useServerRequest();
	const [page, setPage] = useState(1);
	const [lastPage, setLastPate] = useState(1);
	const isLoadingData = posts.length === 0;

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(
			({ response: { posts, links } }) => {
				setPosts(posts);
				setLastPate(getLastPageFromLinks(links));
			},
		);
	}, [requestServer, page]);

	return (
		<div className={className}>
			{isLoadingData ? (
				<Loader />
			) : (
				<>
					<H2>Все статьи блога</H2>
					<div className='postCardWrapper'>
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
					{lastPage > 1 && (
						<Pagination
							page={page}
							setPage={setPage}
							lastPage={lastPage}
						/>
					)}
				</>
			)}
		</div>
	);
};

export const MainPage = styled(MainPageContainer)`
	text-align: center;
	max-width: 80%;
	.postCardWrapper {
		display: flex;
		justify-content: center;
		gap: 32px;
		flex-wrap: wrap;
		margin-bottom: 32px;
	}
`;
