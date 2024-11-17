export const updateUserRole = (userId, roleId) => {
	fetch(`http://localhost:5000/users/${userId}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			role_id: roleId,
		}),
	});
};
