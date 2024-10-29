import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
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

const Footer = styled.div`
	padding: 64px 0px 24px 0px;
`;

export const Blog = () => {
	return (
		<Container>
			<Header />
			<Content>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>} />
					<Route path='/login' element={<div>Авторизация</div>} />
					<Route path='/register' element={<div>Регистрация</div>} />
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
