import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useResetForm } from '../../hooks'
import { setUser } from '../../state/action'
import { selectRole } from '../../state/selectors'
import { Input, Button, H2, FormErrorMessage } from '../../shared'
import { ROLE } from '../../constants'
import styled from 'styled-components'
import { requiest } from '../../utils'

const loginSchema = yup.object().shape({
	login: yup.string().required('Логин обязателен'),
	password: yup.string().required('Пароль обязателен'),
})

const LoginContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const currentRole = useSelector(selectRole)

	useResetForm(reset)

	const login = ({ login, password }) => {
		requiest('/api/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(error)
			} else {
				dispatch(setUser(user))
				sessionStorage.setItem('userData', JSON.stringify(user))
			}
		})
	}

	const errorSchema = errors?.login?.message || errors?.password?.message
	const errorMessage = errorSchema || serverError

	if (currentRole !== ROLE.GUEST) {
		return <Navigate to='/' />
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(login)}>
				{errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
				<Input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button
					type='submit'
					disabled={!!errorMessage}>
					Войти
				</Button>
			</form>
			<div className='register'>
				Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
			</div>
		</div>
	)
}

export const Login = styled(LoginContainer)`
	align-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	form {
		width: 518px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;
	}
	.register {
		text-align: center;
		font-size: 1.1rem;
		a {
			color: #7f56d9;
			text-decoration: underline;
		}
	}
`
