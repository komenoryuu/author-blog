import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	height: 100vh;
	text-align: center;
`;

const Header = styled.div`
	padding: 24px 0px;
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
			<Header>Шапка</Header>
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
