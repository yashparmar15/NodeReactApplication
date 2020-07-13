const mongoose = require("mongoose");
// const { batch } = require("react-redux");
const Schema = mongoose.Schema;
const ProjectSchema = require("./Projects");

const StudentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	college_name: {
		type: String,
		required: true,
	},
	github_id: {
		type: String,
	},
	linkedin_id: {
		type: String, // URL ayega shyd
	},
	about: {
		type: String,
	},
	batch: {
		type: Number,
		required: true,
	},
	work_exp: Number,
	branch: {
		type: String,
	},
	followers: {
		type: Number,
		default: 0,
	},
	following: {
		type: Number,
		default: 0,
	},
	views_on_profile: {
		type: Number,
		default: 0,
	},
	skills: {
		type: [String],
	},
	phone_number: {
		type: Number,
	},
	projects: {
		type: [ProjectSchema],
	},
	likes: {
		type: Number,
		default: 0,
	},
	join_date: {
		type: Date,
		default: Date.now(),
	},
	posts: {
		// type: [PostSchema],
	},
});

mongoose.model("students", StudentSchema);
