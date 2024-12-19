import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../state/action'
import { selectRole, selectLogin } from '../../../state/selectors'
import { Button, IconWithText } from '../../../shared'
import { checkAccess } from '../../../utils'
import { ROLE } from '../../../constants'
import styled from 'styled-components'

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	const currentRole = useSelector(selectRole)
	const userLogin = useSelector(selectLogin)
	const dispatch = useDispatch()
	const isAdmin = checkAccess([ROLE.ADMIN], currentRole)

	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
		navigate('/')
	}

	return (
		<div className={className}>
			<nav>
				{isAdmin && (
					<>
						<Link to='/post'>
							<IconWithText
								iconId='fa-file-text-o'
								content={'Новая статья'}
							/>
						</Link>
						<Link to='/users'>
							<IconWithText
								iconId='fa-user-o'
								content={'Пользователи'}
							/>
						</Link>
					</>
				)}
				<Link onClick={() => navigate(-1)}>
					<IconWithText
						iconId='fa-hand-o-left'
						content={'Назад'}
					/>
				</Link>
			</nav>
			{currentRole === ROLE.GUEST ? (
				<Button
					width='118px'
					onClick={() => navigate('/login')}>
					Войти
				</Button>
			) : (
				<div className='logout'>
					{userLogin}
					<Button
						width='118px'
						height='38px'
						onClick={onLogout}>
						Выйти
					</Button>
				</div>
			)}
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	gap: 30px;
	nav {
		display: flex;
		gap: 30px;
		a {
			font-size: 1.1rem;
			display: flex;
			gap: 7px;
			transition: all 0.3s;
			&:hover {
				color: #7f56d9;
			}
		}
	}
	.logout {
		max-height: 100%;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}
`
