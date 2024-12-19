module.exports = function (user) {
	const formatter = new Intl.DateTimeFormat('ru', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	})

	const date = new Date(user.createdAt)

	return {
		id: user.id,
		login: user.login,
		roleId: user.role,
		registeredDate: formatter.format(date),
	}
}
