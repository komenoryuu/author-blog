import styled from 'styled-components';
import { IconWithText } from '../../shared';

const ErrorPageContainer = ({ className, error }) => {
	return (
		<div className={className}>
			<IconWithText
				className='errorTitle'
				iconSize='2.3rem'
				iconId='fa-exclamation-circle'
				content='Ошибка...'
			/>
			<div className='errorMessage'>{error}</div>
		</div>
	);
};

export const ErrorPage = styled(ErrorPageContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	.errorTitle {
		display: flex;
		align-items: center;
		font-size: 2.3rem;
	}
	.errorMessage {
		font-size: 1.7rem;
	}
`;
