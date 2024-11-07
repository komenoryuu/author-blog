import { H2 } from '../../shared';

export const Content = ({ error, children }) => {
	if (!error) return children;

	return <H2>{error}</H2>;
};
