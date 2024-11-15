import { H2, Icon, Input } from '../../../shared';
import styled from 'styled-components';

const SearchFormContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<H2 margin='10px' size='2.5rem'>
				Поиск статьи
			</H2>
			<p>
				Введите название статьи или ключевые слова, содержащиеся в
				статье
			</p>
			<div>
				<div className='inputWrapper'>
					<Input
						value={searchPhrase}
						width='100%'
						placeholder='Поиск...'
						onChange={onChange}
					/>
					<Icon className='icon' id='fa-search' />
				</div>
			</div>
		</div>
	);
};

export const SearchForm = styled(SearchFormContainer)`
	margin-bottom: 50px;
	p {
		color: #667085;
		font-size: 1.2rem;
		margin-bottom: 32px;
	}
	div {
		display: flex;
		justify-content: center;
		gap: 10px;
		.inputWrapper {
			width: 70%;
			position: relative;
			& > input {
				padding-right: 35px;
			}
		}
		.icon {
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translate(0, -50%);
		}
	}
`;
