import { Button } from '../../../shared';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className='currentPage'>
				Страница: <span>{page}</span>
			</div>

			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	align-items: center;
	gap: 20px;
	.currentPage {
		min-width: calc(100% / 5);
		font-size: 1.2rem;
		span {
			font-weight: 600;
		}
	}
`;
