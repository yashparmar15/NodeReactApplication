const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-url");

const ProjectSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	title: {
		type: Number,
		required: true
	},

	date: {
		type: Date,
		default: Date.now()
	},
	tags: {
		type: [String]
	},

	projectBy: mongoose.Schema.ObjectId,

	githubLink: {
		type: String,
		required: true
	},
	deploymentLink: {
		type: String
	},
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
