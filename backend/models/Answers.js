const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	answer: {
		type: String,
		required: true,
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
	answeredBy: mongoose.Schema.ObjectId,
	username: String,
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
