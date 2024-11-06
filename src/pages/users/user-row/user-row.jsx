import { useDispatch } from 'react-redux';
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

export const UserRowContainer = ({ className, login, registered_date, id }) => {
	const dispatch = useDispatch();
	const onRoleChange = () => {};

	const roles = [
		{
			id: '0',
			name: 'Администратор',
		},
		{
			id: '1',
			name: 'Модератор',
		},
		{
			id: '2',
			name: 'Читатель',
		},
	];

	return (
		<tr className={className}>
			<td>{login}</td>
			<td>{registered_date}</td>
			<td>
				<Wrapper>
					<select value={id} onChange={() => onRoleChange()}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Button width='29px' height='29px'>
						<Icon id='fa-check' size='1.3rem' />
					</Button>
				</Wrapper>
			</td>
			<td>
				<Wrapper
					className='wrapperDeleteUser'
					onClick={() => dispatch(/* TODO*/)}
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
