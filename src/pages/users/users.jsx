import { H2 } from '../../shared';
import { UserRow } from './user-row';
import styled from 'styled-components';

const Th = styled.th`
	padding: 12px;
	text-align: left;
`;

const UsersContainer = ({ className }) => {
	const users = [
		{
			id: '001',
			login: 'komenoryuu',
			password: 'gohanDESU1234',
			registered_date: '28.10.2024',
			role_id: 0,
		},
	];

	return (
		<div className={className}>
			<H2>Пользователи</H2>
			<table>
				<thead>
					<tr>
						<Th>Имя пользователя</Th>
						<Th>Дата регистрации</Th>
						<Th>Роль</Th>
						<Th>Действия</Th>
					</tr>
				</thead>
				<tbody>
					{users.map(({ id, login, registered_date, role_id }) => (
						<UserRow
							key={id}
							login={login}
							registered_date={registered_date}
							role_id={role_id}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;

	& > table {
		height: 100%;
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
		overflow: hidden;
		border-radius: 8px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

		& > thead {
			background-color: #7f56d9;
			color: #fff;
		}
	}
`;
