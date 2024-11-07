import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';
import { Login, Register, Users } from './pages';
import styled from 'styled-components';

const Container = styled.div`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	height: 100%;
	max-width: 90vw;
`;

const Main = styled.main`
	flex: 1 0 auto;
	padding: 24px 0px;
	display: flex;
	justify-content: center;
`;

export const Blog = () => {
	return (
		<Container>
			<Header />
			<Main>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/users' element={<Users />} />
					<Route path='/post' element={<div>Новая статья</div>} />
					<Route path='/post/:post_id' element={<div>Статья</div>} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Main>
			<Footer />
		</Container>
	);
};
