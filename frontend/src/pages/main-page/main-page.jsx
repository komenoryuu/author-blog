import { useEffect, useMemo, useState } from 'react'
import { H2, Loader } from '../../shared'
import { PostCard } from './post-card'
import { Pagination } from './pagination'
import { SearchForm } from './search-form'
import { debounce } from './utils'
import { PAGINATION_LIMIT } from '../../constants'
import { requiest } from '../../utils'
import styled from 'styled-components'

const Wrapper = styled.div`
	margin-bottom: 80px;
	display: flex;
	justify-content: center;
	gap: 32px;
	flex-wrap: wrap;
`

const MainPageContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPate] = useState(1)
	const [shouldSearch, setShouldSearch] = useState(false)
	const [searchPhrase, setSearchPhrase] = useState('')
	const isLoadingData = posts.length === 0 && searchPhrase.length === 0

	useEffect(() => {
		requiest(`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { posts, lastPage } }) => {
				setPosts(posts)
				setLastPate(lastPage)
			},
		)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)

		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			{isLoadingData ? (
				<Loader />
			) : (
				<>
					<SearchForm
						searchPhrase={searchPhrase}
						onChange={onSearch}
					/>
					<H2>Все статьи блога</H2>
					<Wrapper style={{ height: '100%' }}>
						{posts.length !== 0 ? (
							<Wrapper>
								{posts.map(({ id, title, imageUrl, publishedDate, comments }) => (
									<PostCard
										key={id}
										id={id}
										title={title}
										imageUrl={imageUrl}
										publishedDate={publishedDate}
										commentsCount={comments.length}
									/>
								))}
							</Wrapper>
						) : (
							<div style={{ fontSize: '1.3rem' }}>Такой статьи не найдено...</div>
						)}
						{lastPage > 1 && posts.length > 0 && (
							<Pagination
								page={page}
								setPage={setPage}
								lastPage={lastPage}
							/>
						)}
					</Wrapper>
				</>
			)}
		</div>
	)
}

export const MainPage = styled(MainPageContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: center;
	max-width: 80%;
`
