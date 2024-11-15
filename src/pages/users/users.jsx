import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { AccessDeniedPage } from '../../components';
import { H2, Loader } from '../../shared';
import { UserRow } from './user-row';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils';
import { selectRole } from '../../selectors';
import styled from 'styled-components';

const Th = styled.th`
	padding: 12px;
	text-align: left;
`;

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [updateUsers, setUpdateUsers] = useState(false);
	const userRole = useSelector(selectRole);
	const requestServer = useServerRequest();
	const isLoadingData = users.length === 0;

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;

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
	}, [requestServer, updateUsers, userRole]);

	const onUserDelete = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;

		requestServer('deleteUser', userId).then(() =>
			setUpdateUsers(!updateUsers),
		);
	};

	return (
		<div className={className}>
			<AccessDeniedPage access={[ROLE.ADMIN]} serverError={errorMessage}>
				{isLoadingData ? (
					<Loader />
				) : (
					<>
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
								{users.map(
									({ id, login, registeredDate, roleId }) => (
										<UserRow
											key={id}
											id={id}
											login={login}
											registeredDate={registeredDate}
											roleId={roleId}
											roles={roles.filter(
												({ id }) =>
													Number(id) !== ROLE.GUEST,
											)}
											onUserDelete={() =>
												onUserDelete(id)
											}
										/>
									),
								)}
							</tbody>
						</table>
					</>
				)}
			</AccessDeniedPage>
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
