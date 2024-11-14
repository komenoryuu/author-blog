import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../action';
import { useServerRequest } from '../../../hooks';
import { Input } from '../../../shared';
import { PostControlPanel } from '../components/post-control-panel';
import { sanitizeContent } from './utils/sanitizeContent';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<div className='inputWrapper'>
				<span>Новое изображение</span>
				<Input
					ref={imageRef}
					defaultValue={imageUrl}
					placeholder='Изображение...'
				/>
			</div>
			<div className='inputWrapper'>
				<span>Новый заголовок</span>
				<Input
					ref={titleRef}
					defaultValue={title}
					placeholder='Заголовок...'
				/>
			</div>
			<PostControlPanel
				id={id}
				publishedAt={publishedAt}
				iconId={'fa-check-square-o'}
				handler={onSave}
			>
				Сохранить
			</PostControlPanel>
			<p
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
			>
				{content}
			</p>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	margin: 0 auto;
	margin-bottom: 24px;
	max-width: 70%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	.inputWrapper {
		font-size: 1.1rem;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	& > p {
		padding: 10px;
		outline: none;
		border: 1px solid #000;
		border-radius: 8px;
		font-size: 1.2rem;
		white-space: pre-line;
		overflow-wrap: break-word;
		&:focus {
			border-color: #fff;
			outline: 2px solid #7f56d9;
		}
	}
`;
