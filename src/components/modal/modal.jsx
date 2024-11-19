import { useSelector } from 'react-redux';
import {
	selectModalText,
	selectModalOpen,
	selectModalConfirm,
	selectModalCancel,
} from '../../state/selectors';
import { Button, H3 } from '../../shared';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const isOpen = useSelector(selectModalOpen);
	const onConfirm = useSelector(selectModalConfirm);
	const onCancel = useSelector(selectModalCancel);

	if (!isOpen) return null;

	return (
		<div className={className}>
			<div className='overlay'>
				<div className='box'>
					<H3>{text}</H3>
					<Button onClick={onConfirm}>Да</Button>
					<Button onClick={onCancel}>Отмена</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 10;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	.overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
	}
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		position: relative;
		z-index: 15;
		top: 50%;
		transform: translate(0, -50%);
		margin: 0 auto;
		padding: 20px;
		width: 35%;
		height: 25%;
		background-color: #fff;
		border-radius: 8px;
		font-size: 1.5rem;
	}
`;
