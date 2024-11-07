import { useState } from 'react';
import { useServerRequest } from '../../../hooks';
import { Button, Icon } from '../../../shared';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	gap: 7px;
	& > select {
		border: 1px solid #7f56d9;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
		border-radius: 8px;
		font-size: 1rem;
		padding: 4px 7px;
		cursor: pointer;
	}
`;

export const UserRowContainer = ({
	className,
	id,
	login,
	registeredDate,
	roleId: userRoleId,
	roles,
	onUserDelete
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) =>
		setSelectedRoleId(Number(target.value));

	const onRoleSave = (userId, newUserRoleId) =>
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});

	return (
		<tr className={className}>
			<td>{login}</td>
			<td>{registeredDate}</td>
			<td>
				<Wrapper>
					<select
						value={selectedRoleId}
						onChange={(e) => onRoleChange(e)}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					{initialRoleId !== selectedRoleId && (
						<Button
							width='29px'
							height='29px'
							onClick={() => onRoleSave(id, selectedRoleId)}
						>
							<Icon id='fa-check' size='1.3rem' />
						</Button>
					)}
				</Wrapper>
			</td>
			<td>
				<Wrapper
					className='wrapperDeleteUser'
					onClick={() => onUserDelete(id)}
				>
					<span>Удалить пользователя</span>
					<Icon id='fa-trash-o' size='1.3rem' />
				</Wrapper>
			</td>
		</tr>
	);
};

export const UserRow = styled(UserRowContainer)`
	& > td {
		padding: 12px;
		text-align: left;
		& .wrapperDeleteUser {
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				color: #7f56d9;
			}
		}
	}
`;
