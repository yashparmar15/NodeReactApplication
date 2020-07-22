const express = require("express");
const router = express.Router();
// const Question = require('../models/Questions');
const Project = require("../models/Projects");

function isUserAuthenticated(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect("/");
	}
}

router.post("", isUserAuthenticated, async (req, res) => {
	//   console.log('reached');
	//   console.log(req.body);
	console.log(req.user);
	const title = await req.body.title;
	const description = await req.body.description;
	const tags = await req.body.finalTags;
	const repoLink = await req.body.repoLink;
	const deployLink = await req.body.deployLink;
	const projectBy = await req.user;
	// console.log(projectBy);

	new Project({
		title,
		description,
		tags,
		githubLink: repoLink,
		deploymentLink: deployLink,
		projectBy,
	})
		.save()
		.then(() => {
			console.log("Project Saved");
			return res.status(200);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500);
		});
});

router.get("", async (req, res) => {
	var usersProjection = {
		__v: false,
		_id: false,
	};
	const AllProjects = await Project.find({}, usersProjection);
	res.status(200).send(AllProjects);
});

module.exports = router;
