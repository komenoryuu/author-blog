export const transformComments = (dbComment) => ({
	postId: dbComment.post_id,
	authorId: dbComment.author_id,
	publishedDate: dbComment.published_date,
	content: dbComment.content,
	id: dbComment.id,
});
