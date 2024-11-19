import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useResetForm } from '../../hooks';
import { server } from '../../bff';
import { setUser } from '../../state/action';
import { selectRole } from '../../state/selectors';
import { Input, Button, H2, FormErrorMessage } from '../../shared';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const registerSchema = yup.object().shape({
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
	passwordCheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Повтор пароля введён неверно'),
});

const RegisterContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passwordCheck: '',
		},
		resolver: yupResolver(registerSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const currentRole = useSelector(selectRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(error);
			} else {
				dispatch(setUser(response));
				sessionStorage.setItem('userData', JSON.stringify(response));
			}
		});
	};

	const errorSchema =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passwordCheck?.message;
	const errorMessage = errorSchema || serverError;

	if (currentRole !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
				<Input
					type='password'
					placeholder='Повтор пароля...'
					{...register('passwordCheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type='submit' disabled={!!errorMessage}>
					Зарегистрироваться
				</Button>
			</form>
		</div>
	);
};

export const Register = styled(RegisterContainer)`
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
