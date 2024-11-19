export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	password: dbUser.password,
	registeredDate: dbUser.registered_date,
	roleId: dbUser.role_id,
});
