import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Icon, IconWithText } from '../../../shared'
import styled from 'styled-components'
import { PROP_TYPE } from '../../../constants'
import { requiest } from '../../../utils'

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
`

export const UserRowContainer = ({
	className,
	id,
	login,
	registeredDate,
	roleId: userRoleId,
	roles,
	onUserDelete,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)

	const onRoleChange = ({ target }) => setSelectedRoleId(Number(target.value))

	const onRoleSave = (userId, newUserRoleId) =>
		requiest(`/api/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId)
		})

	return (
		<tr className={className}>
			<td>{login}</td>
			<td>{registeredDate}</td>
			<td>
				<Wrapper>
					<select
						value={selectedRoleId}
						onChange={e => onRoleChange(e)}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option
								key={roleId}
								value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					{initialRoleId !== selectedRoleId && (
						<Button
							width='29px'
							height='29px'
							onClick={() => onRoleSave(id, selectedRoleId)}>
							<Icon
								id='fa-check'
								size='1.3rem'
							/>
						</Button>
					)}
				</Wrapper>
			</td>
			<td>
				<Wrapper
					className='wrapperDeleteUser'
					onClick={() => onUserDelete(id)}>
					<IconWithText
						iconId={'fa-trash-o'}
						iconSize='1.4rem'
						content={'Удалить пользователя'}
					/>
				</Wrapper>
			</td>
		</tr>
	)
}

export const UserRow = styled(UserRowContainer)`
	font-size: 1.2rem;
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
`

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredDate: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserDelete: PropTypes.func.isRequired,
}
