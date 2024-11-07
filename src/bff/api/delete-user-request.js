export const deleteUserRequest = (userId) => {
	fetch(`http://localhost:5000/users/${userId}`, {
		method: 'DELETE',
	});
};
