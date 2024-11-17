import { Icon } from './icon';
import styled from 'styled-components';

const IconWithTextContainer = ({
	className,
	iconId,
	iconSize = '1.2rem',
	content,
	...props
}) => {
	return (
		<div className={className} {...props}>
			<Icon id={iconId} size={iconSize} />
			<span>{content}</span>
		</div>
	);
};

export const IconWithText = styled(IconWithTextContainer)`
	display: flex;
	align-items: center;
	gap: 8px;
`;
