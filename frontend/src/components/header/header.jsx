import { Logo } from './logo';
import { Description } from './description';
import { ControlPanel } from './control-panel';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description />
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	min-height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
