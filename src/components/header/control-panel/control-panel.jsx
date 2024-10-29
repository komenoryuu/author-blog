import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../shared';
import styled from 'styled-components';

const LoginLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #7f56d9;
	border: 3px solid #7f56d9;
	width: 118px;
	height: 48px;
	border-radius: 8px;
	color: #fff;
	font-size: 1.2rem;
	transition: all 0.3s;
	&:hover {
		background-color: #ffffff;
		border-color: #7f56d9;
		color: #000;
	}
`;

const OptionsLink = styled(Link)`
	font-size: 1.1rem;
	display: flex;
	gap: 7px;
	transition: all 0.3s;
	&:hover {
		color: #7f56d9;
	}
`;

const Nav = styled.nav`
	display: flex;
	gap: 30px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<Nav>
				<OptionsLink to='/post'>
					Новая статья
					<Icon id='fa-file-text-o' size='1.1rem' />
				</OptionsLink>
				<OptionsLink to='/users'>
					Пользователи
					<Icon id='fa-user-o' size='1.1rem' />
				</OptionsLink>
				<OptionsLink onClick={() => navigate(-1)}>
					Назад
					<Icon id='fa-hand-o-left' size='1.1rem' />
				</OptionsLink>
			</Nav>
			<LoginLink to='/login'>Войти</LoginLink>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	gap: 30px;
`;
