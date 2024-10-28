import styled from 'styled-components';

const Div = styled.div`
	font-size: 2rem;
	text-align: center;
	background-color: #282c34;
`;

export const App = () => {
	return (
		<>
			<i className='fa fa-camera-retro'>Font-awesome test</i>
			<Div>Styled-components test</Div>
		</>
	);
};
