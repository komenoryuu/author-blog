import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Content } from '../../components';
import { H2 } from '../../shared';
import { UserRow } from './user-row';

import styled from 'styled-components';
import { ROLE } from '../../constants';

const Th = styled.th`
	padding: 12px;
	text-align: left;
`;

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersResponse, rolesResponse]) => {
			const error = usersResponse.error || rolesResponse.error;

			if (error) {
				setErrorMessage(error);
				return;
			}

			setUsers(usersResponse.response);
			setRoles(rolesResponse.response);
		});
	}, [requestServer]);

	return (
		<div className={className}>
			<Content error={errorMessage}>
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
						{users.map(({ id, login, registeredDate, roleId }) => (
							<UserRow
								key={id}
								login={login}
								registeredDate={registeredDate}
								roleId={roleId}
								roles={roles.filter(
									({ id }) => Number(id) !== ROLE.GUEST,
								)}
							/>
						))}
					</tbody>
				</table>
			</Content>
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
