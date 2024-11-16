import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
	return <div className={className}></div>;
};

export const Loader = styled(LoaderContainer)`
	margin: 0 auto;
	width: fit-content;
	font-size: 1.1rem;
	padding-bottom: 5px;
	background: linear-gradient(currentColor 0 0) 0 100%/0% 1px no-repeat;
	animation: l2 2s linear infinite;

	&:before {
		content: 'Загрузка...';
	}

	@keyframes l2 {
		to {
			background-size: 100% 1px;
		}
	}
`;
