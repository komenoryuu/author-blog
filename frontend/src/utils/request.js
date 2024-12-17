export function requiest(url, method = 'GET', data) {
	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method,
		body: data ? JSON.stringify(data) : undefined,
	}).then(res => res.json())
}
