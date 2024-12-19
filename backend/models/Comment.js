const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		createdAt: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Comment }
