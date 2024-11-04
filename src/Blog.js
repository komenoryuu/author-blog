import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';
import { Login, Register } from './pages';
import styled from 'styled-components';

const Container = styled.div`
	min-height: 100vh;
	max-width: 90vw;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Content = styled.div`
	padding: 24px 0px;
`;

export const Blog = () => {
	return (
		<Container>
			<Header />
			<Content>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/users' element={<div>Пользователи</div>} />
					<Route path='/post' element={<div>Новая статья</div>} />
					<Route path='/post/:post_id' element={<div>Статья</div>} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer>Футер</Footer>
		</Container>
	);
};
