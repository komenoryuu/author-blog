export const readRoles = async () =>
	fetch('http://localhost:5000/roles').then((rolesData) => rolesData.json());
