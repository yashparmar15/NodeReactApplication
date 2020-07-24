const passport = require("passport");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Question = require("../models/Questions");
const { combineReducers } = require("redux");

router.post("/answers", async (req, res) => {
	console.log(4);
	const id = req.body.q_id;
	await Question.findById(id)
		.exec()
		.then((doc) => {
			if (doc) {
				res.send(doc.answers);
			} else {
				res.send(404);
			}
		});
});

router.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
router.get(
	"/auth/github",
	passport.authenticate("github", {
		scope: ["user: email"],
	})
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google"),
	(req, res) => {
		if (req.user.flag) {
			console.log(req.user);
			const dummy = req.user;
			dummy["flag"] = false;
			User.findByIdAndUpdate(
				req.user._id,
				dummy,
				{ runValidators: true },
				(err, response) => {
					if (err) console.log(err);
				}
			);
			res.redirect(`/info`);
		} else res.redirect("/");
	}
);
router.get(
	"/auth/github/callback",
	passport.authenticate("github"),
	(req, res) => {
		if (req.user.flag) {
			console.log(req.user);
			const dummy = req.user;
			dummy["flag"] = false;
			User.findByIdAndUpdate(
				req.user._id,
				dummy,
				{ runValidators: true },
				(err, response) => {
					if (err) console.log(err);
				}
			);
			res.redirect(`/info`);
		} else res.redirect("/");
	}
);

router.get("/api/current_user", (req, res) => {
	res.send(req.user);
});

router.post("/api/questions", async (req, res, next) => {
	const content = await req.body.content;
	const question = await req.body.question;
	const tags = await req.body.allTags;
	const askedBy = await req.user;
	const filtertags = await req.body.filtertags;

	console.log(req.user);

	// console.log(req.body);
	// console.log("Question:", question);
	// console.log("DraftJS:", content);
	// console.log("Tags:", tags);
	// if (question === "" && filtertags.length !== 0) {
	// 	console.log(filtertags.length);
	// 	console.log("filterwala h ");
	// }
	if (question) {
		User.findByIdAndUpdate(
			{ _id: askedBy._id },
			{ $inc: { totalquestions: 1 } },
			(err, res) => {
				if (err) {
					return res.status(500);
				}
			}
		);

		new Question({
			title: question,
			description: content,
			askedBy: askedBy,
			tags: tags,
		})
			.save()
			.then(() => {
				console.log("Saved!");
				return res.status(200);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500);
			});
	}

	res.redirect("/questions");
	//
});

router.post("/api/questions/:id", async (req, res, next) => {
	const answer = await req.body.answer;
	// console.log(answer);
	const id = req.params.id;
	const answeredby = await req.user;

	if (answer) {
		User.findByIdAndUpdate(
			{ _id: answeredby._id },
			{ $inc: { totalanswers: 1 } },
			(err, res) => {
				if (err) {
					return res.status(500);
				}
			}
		);

		const currAns = {
			answer: answer,
			askedBy: req.user._id,
			username: req.user.username,
		};
		console.log(currAns);
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

router.get("/api/allusers", async (req, res) => {
	// console.log(4);
	let allusers = await User.find({});
	return res.status(200).send(allusers);
});

router.get("/api/answers/:id", async (req, res) => {
	console.log(4);
	console.log(req.body);
	console.log(req.params.id);
	// res.send(4);

	const id = req.params.id;
	await Question.findById(id)
		.exec()
		.then((doc) => {
			if (doc) {
				res.send(doc.answers);
			} else {
				res.sendStatus(404);
			}
		});
});

router.get("/api/getTopUsersQ", async (req, res) => {
	// console.log(4);
	var usersProjection = {
		__v: false,
		_id: false,
	};
	const topUsersQ = await User.find({}, usersProjection).sort({
		totalquestions: -1,
	});
	// console.log(topUsersQ);
	res.send(topUsersQ);
});

router.get("/api/getTopUsersA", async (req, res) => {
	// console.log(4);
	var usersProjection = {
		__v: false,
		_id: false,
	};
	const topUsersA = await User.find({}, usersProjection).sort({
		totalanswers: -1,
	});
	console.log(topUsersA);
	res.send(topUsersA);
});

router.get("/api/questions", async (req, res) => {
	await Question.find()
		.populate("askedBy")
		.then((questions) => {
			// console.log(questions)
			return res.status(200).send(questions);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500);
		});
});

router.post("/api/filter", async (req, res, next) => {
	const tags = await req.body.allTags;
	console.log(req.body);
	console.log("Tags:", tags);
	console.log(req.body);

	// console.log(req.body);
	// console.log(4);
	await Question.find()
		.populate("askedBy")
		.then((questions) => {
			// console.log(questions)
			res.send(questions);
		})
		.catch((err) => console.log(err));
});

//   await Question.findById(

//     // {

//     //   $push: { upvotes: req.user._id },
//     //   $pull: { downvotes: req.user._id },
//     // },
//     // {
//     //   new: true,
//     // }
//   ).exec((err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err });
//     } else {
//       res.json(result);
//     }
//   });
// });
// router.put('/api/question/downvote', async (req, res) => {
//   console.log('downvote', req.body);
//   await Question.findByIdAndUpdate(
//     req.body.questionId,
//     {
//       $pull: { upvotes: req.user._id },
//       $push: { downvotes: req.user._id },
//     },
//     {
//       new: true,
//     }
//   ).exec((err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err });
//     } else {
//       res.json(result);
//     }
//   });
// });

router.get("/api/logout", (req, res) => {
	req.logout();
	req.session = null;
	res.clearCookie("college", { path: "/", httpOnly: true });
	res.clearCookie("college.sig", { path: "/", httpOnly: true });
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

// router.get('/profile/:id', isUserAuthenticated, (req, res, next) => {
//   res.send('You have reached the secret route');
// });
module.exports = router;
