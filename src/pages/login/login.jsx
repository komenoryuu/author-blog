import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useResetForm } from '../../hooks';
import { server } from '../../bff';
import { Input, Button, H2, FormErrorMessage } from '../../shared';
import { setUser } from '../../action';
import { selectRole } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const Register = styled.div`
	text-align: center;
	font-size: 1.1rem;
`;

const RegisterLink = styled(Link)`
	font-size: 1.1rem;
	color: #7f56d9;
	text-decoration: underline;
	transition: all 0.3s;
	&:hover {
		color: #6027db;
	}
`;

const loginSchema = yup.object().shape({
	login: yup.string().required('Логин обязателен'),
	password: yup.string().required('Пароль обязателен'),
});

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
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const currentRole = useSelector(selectRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.login(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(error);
			} else {
				dispatch(setUser(response));
				sessionStorage.setItem('userData', JSON.stringify(response));
			}
		});
	};

	const errorSchema = errors?.login?.message || errors?.password?.message;
	const errorMessage = errorSchema || serverError;

	if (currentRole !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errorMessage && (
					<FormErrorMessage>{errorMessage}</FormErrorMessage>
				)}
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
				<Button type='submit' disabled={!!errorMessage}>
					Войти
				</Button>
				<Register>
					Нет аккаунта?{' '}
					<RegisterLink to='/register'>
						Зарегистрироваться
					</RegisterLink>
				</Register>
			</form>
		</div>
	);
};

export const Login = styled(LoginContainer)`
	align-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	& > form {
		width: 518px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;
