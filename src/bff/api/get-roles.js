export const getRoles = () =>
	fetch('http://localhost:5000/roles').then((rolesData) => rolesData.json());
