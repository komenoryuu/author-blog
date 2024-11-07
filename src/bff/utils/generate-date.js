export const generateDate = () =>
	new Intl.DateTimeFormat('ru').format(Date.now());
