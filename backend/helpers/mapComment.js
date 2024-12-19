module.exports = function (comment) {
	const formatter = new Intl.DateTimeFormat('ru', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})

	const date = new Date(comment.createdAt)

	return {
		author: comment.author.login,
		content: comment.content,
		id: comment._id,
		publishedDate: formatter.format(date),
	}
}
