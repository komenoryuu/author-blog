import { transformSession } from '../transformers';

export const readSession = async (hash) =>
	fetch(`http://localhost:5000/sessions?hash=${hash}`)
		.then((session) => session.json())
		.then(([session]) => session && transformSession(session));
