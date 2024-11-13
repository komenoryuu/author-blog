import { Icon } from '../../../shared';
import styled from 'styled-components';

const Option = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s;
	&:hover {
		color: #7f56d9;
	}
`;

const PostControlPanelContainer = ({
	className,
	publishedAt,
	iconId,
	handler,
	children,
}) => {
	return (
		<div className={className}>
			<div className='calendarWrapper'>
				<Icon id='fa-calendar-o' size='1.2rem' />
				<span>{publishedAt}</span>
			</div>
			<div className='optionsWrapper'>
				<Option onClick={() => handler()}>
					{children}
					<Icon id={iconId} size='1.4rem' />
				</Option>
				<Option>
					Удалить
					<Icon id='fa-trash-o' size='1.4rem' />
				</Option>
			</div>
		</div>
	);
};

export const PostControlPanel = styled(PostControlPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
	font-size: 1.2rem;
	.calendarWrapper {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.optionsWrapper {
		display: flex;
		gap: 20px;
	}
`;
