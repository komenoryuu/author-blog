import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Header, Footer, Modal, ErrorPage } from './components'
import { Login, Register, Users, Post, MainPage } from './pages'
import { setUser } from './state/action'
import { ERROR } from './constants'
import styled from 'styled-components'

const Container = styled.div`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	height: 100%;
	max-width: 90vw;
`

const Main = styled.main`
	position: relative;
	flex: 1 0 auto;
	padding: 50px 0px;
	display: flex;
	justify-content: center;
`

export const Blog = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) return

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		)
	}, [dispatch])

	return (
		<Container>
			<Modal />
			<Header />
			<Main>
				<Routes>
					<Route
						path='/'
						element={<MainPage />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/users'
						element={<Users />}
					/>
					<Route
						path='/posts'
						element={<div>Статьи</div>}
					/>
					<Route
						path='/post'
						element={<Post />}
					/>
					<Route
						path='/post/:id'
						element={<Post />}
					/>
					<Route
						path='/post/:id/edit'
						element={<Post />}
					/>
					<Route
						path='*'
						element={<ErrorPage error={ERROR.PAGE_NOF_FOUND} />}
					/>
				</Routes>
			</Main>
			<Footer />
		</Container>
	)
}
