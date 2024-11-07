import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button } from '../../../shared';
import { ROLE } from '../../../constants';
import { selectRole, selectLogin, selectSession } from '../../../selectors';
import { logout } from '../../../action';
import styled from 'styled-components';

const StyledLink = styled(Link)`
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

const UserLogin = styled.div`
	max-height: 100%;
	font-weight: 600;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const currentRole = useSelector(selectRole);
	const userLogin = useSelector(selectLogin);
	const session = useSelector(selectSession);
	const dispatch = useDispatch();

	return (
		<div className={className}>
			<Nav>
				<StyledLink to='/post'>
					Новая статья
					<Icon id='fa-file-text-o'/>
				</StyledLink>
				<StyledLink to='/users'>
					Пользователи
					<Icon id='fa-user-o'/>
				</StyledLink>
				<StyledLink onClick={() => navigate(-1)}>
					Назад
					<Icon id='fa-hand-o-left' />
				</StyledLink>
			</Nav>
			{currentRole === ROLE.GUEST ? (
				<Button width='118px' onClick={() => navigate('/login')}>
					Войти
				</Button>
			) : (
				<UserLogin>
					{userLogin}
					<Button
						width='118px'
						height='38px'
						onClick={() => {
							dispatch(logout(session));
							navigate('/');
						}}
					>
						Выйти
					</Button>
				</UserLogin>
			)}
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	gap: 30px;
`;
