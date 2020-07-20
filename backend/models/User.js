const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userId: String,
	username: String,
	picture: String,
	email: String,
	flag: {
		type: Boolean,
		default: true,
	},
	totalquestions: {
		type: Number,
		default: 0,
	},
	totalanswers: {
		type: Number,
		default: 0,
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
