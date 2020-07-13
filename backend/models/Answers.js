const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	answer: {
		type: String,
		required: true,
	},
	upvotes: {
		type: Number,
	},
	downvotes: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	answeredBy: mongoose.Schema.ObjectId,
});

mongoose.model("answers", AnswerSchema);
