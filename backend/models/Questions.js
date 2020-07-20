const mongoose = require("mongoose");
const Answer = require("./Answers");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	views: {
		type: Number,
	},
	upvotes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},

	downvotes: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},

	date: {
		type: Date,
		default: Date.now(),
	},

	// askedBy: mongoose.Schema.ObjectId,
	askedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	answers: {
		type: [Answer.schema],
	},

	tags: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model("questions", QuestionSchema);
