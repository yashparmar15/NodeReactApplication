const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-url");

const ProjectSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	title: {
		type: Number,
		required: true,
	},

	date: {
		type: Date,
		default: Date.now(),
	},
	tags: {
		type: [String],
	},

	projectBy: mongoose.Schema.ObjectId,

	githubLink: {
		type: mongoose.SchemaType.Url,
		required: true,
	},
	deploymentLink: {
		type: mongoose.SchemaType.Url,
	},
});

mongoose.model("projects", ProjectSchema);
