const passport = require("passport");
const Question = require("../models/Questions");
const Answer = require("../models/Answers");

module.exports = (app) => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"],
		})
	);
	app.get(
		"/auth/github",
		passport.authenticate("github", {
			scope: ["user: email"],
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect(`/`);
		}
	);
	app.get(
		"/auth/github/callback",
		passport.authenticate("github"),
		(req, res) => {
			res.redirect(`/`);
		}
	);

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.post("/api/questions", async (req, res, next) => {
		const content = await req.body.content;
		const question = await req.body.question;
		const askedBy = await req.user;

		console.log("Question:", question);
		console.log("DraftJS:", content);
		if (question) {
			new Question({
				title: question,
				description: content,
				askedBy: askedBy,
			})
				.save()
				.then(() => {
					console.log("Saved!");
				})
				.catch((err) => console.log(err));
		}

		res.redirect("/questions");
		//
	});

	app.post("/api/questions/:id", async (req, res, next) => {
		const answer = await req.body.answer;

		const id = req.params.id;
		console.log("Answer:", answer);
		console.log(id);
		console.log(req.user.username);

		if (answer) {
			const currAns = {
				answer: answer,
				askedBy: req.user._id,
				username: req.user.username,
			};
			await Question.findById(id)
				.exec()
				.then((doc) => {
					if (doc) {
						doc.answers.push(currAns);
						doc
							.save()
							.then((savedDoc) => {
								return res.status(200).json({
									error: {},
								});
							})
							.catch((err) => {
								return res.status(500);
							});
					} else {
						return res.status(404);
					}
				})
				.catch((err) => {
					return res.status(500);
				});
		}

		res.redirect("/questions");
		//
	});

	app.get("/api/questions", async (req, res) => {
		await Question.find()
			.populate("askedBy")
			.then((questions) => {
				res.send(questions);
			})
			.catch((err) => console.log(err));
	});

	app.get("/api/logout", async (req, res) => {
		await req.logout();
		req.session = null;
		res.clearCookie("ayan", { path: "/", httpOnly: true });
		res.clearCookie("ayan.sig", { path: "/", httpOnly: true });
		// res.clearCookie('session', { path: '/', httpOnly: true });
		// res.clearCookie('session.sig', { path: '/', httpOnly: true });
		res.redirect("/");
	});

	// function isUserAuthenticated(req, res, next) {
	//   if (req.user) {
	//     next();
	//   } else {
	//     res.redirect('/');
	//   }
	// }

	// app.get('/profile/:id', isUserAuthenticated, (req, res, next) => {
	//   res.send('You have reached the secret route');
	// });
};
