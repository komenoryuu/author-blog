import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useServerRequest } from '../../../hooks';
import { savePostAsync } from '../../../state/action';
import { Input } from '../../../shared';
import { PostControlPanel } from '../components/post-control-panel';
import { sanitizeContent } from './utils/sanitizeContent';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../constants';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedDate },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitlelValue] = useState(title);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const isNewPostPage = id === '';

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitlelValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitlelValue(target.value);

	return (
		<div className={className}>
			<div className='inputWrapper'>
				<span>Новое изображение</span>
				<Input
					value={imageUrlValue}
					placeholder='Изображение...'
					onChange={onImageChange}
				/>
			</div>
			<div className='inputWrapper'>
				<span>Новый заголовок</span>
				<Input
					value={titleValue}
					placeholder='Заголовок...'
					onChange={onTitleChange}
				/>
			</div>
			<PostControlPanel
				id={id}
				publishedDate={publishedDate}
				iconId={'fa-check-square-o'}
				handler={onSave}
			>
				{isNewPostPage ? 'Опубликовать новую статью' : 'Сохранить'}
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
		min-height: 400px;
		padding: 10px;
		outline: none;
		border: 1px solid #000;
		border-radius: 8px;
		font-size: 1.2rem;
		white-space: pre-line;
		overflow-wrap: break-word;
		overflow: auto;
		&:focus {
			border-color: #fff;
			outline: 2px solid #7f56d9;
		}
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
