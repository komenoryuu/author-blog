import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { server } from '../../bff';
import { Input, Button, H2 } from '../../shared';
import { setUser } from '../../action';
import { selectRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants';

const ErrorMessage = styled.div`
	color: #ff0000;
	font-size: 1.1rem;
	text-align: center;
`;

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

const schema = yup.object().shape({
	login: yup
		.string()
		.required('Логин обязателен')
		.matches(
			/^[!?,a-zA-Zа-яА-ЯёЁ0-9]+$/,
			'Логин должен содержать только буквы и цифры',
		)
		.min(3, 'Логин должен состоять минимум из 3 символов')
		.max(20, 'Логин должен содержать не больше 20 символов'),
	password: yup
		.string()
		.required('Пароль обязателен')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
			'Пароль должен содержать строчные и прописные латинские буквы, цифры',
		)
		.min(6, 'Пароль должен состоять минимум из 6 символов')
		.max(30, 'Пароль должен содержать не больше 30 символов'),
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
		resolver: yupResolver(schema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const store = useStore();
	const currentRole = useSelector(selectRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;

			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) reset();
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(error);
			} else {
				dispatch(setUser(response));
			}
		});
	};

	const schemaError = errors?.login?.message || errors?.password?.message;
	const errorMessage = schemaError || serverError;

	if (currentRole !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Input
					type='text'
					placeholder='Логин'
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type='submit' disabled={!!schemaError}>
					Войти
				</Button>
				<Register>
					Нет аккаунта?{' '}
					<RegisterLink to='/register'>
						Зарегестрироваться
					</RegisterLink>
				</Register>
			</form>
		</div>
	);
};

export const Login = styled(LoginContainer)`
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
