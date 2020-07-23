const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");

function isUserAuthenticated(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect("/");
	}
}

router.put("/upvoteQ", isUserAuthenticated, async (req, res) => {
	console.log("upvote", req.body);
	await Question.findById(req.body.questionId)
		.exec()
		.then((Q) => {
			if (Q.upvotes.includes(req.user._id)) {
				console.log("1");

				var userIdIndex = Q.upvotes.indexOf(req.user._id);
				Q.upvotes.splice(userIdIndex, 1);
				Q.save();
				return res.send(Q);
			} else {
				console.log("2");
				Q.upvotes.push(req.user._id);
				if (Q.downvotes.includes(req.user._id)) {
					var userIdIndex = Q.downvotes.indexOf(req.user._id);
					Q.downvotes.splice(userIdIndex, 1);
				}
				Q.save();
				return res.send(Q);
			}
		});
});
router.put("/downvoteQ", isUserAuthenticated, async (req, res) => {
	console.log("downvote", req.body);
	await Question.findById(req.body.questionId)
		.exec()
		.then((Q) => {
			if (Q.downvotes.includes(req.user._id)) {
				console.log("1");
				var userIdIndex = Q.downvotes.indexOf(req.user._id);
				Q.downvotes.splice(userIdIndex, 1);
				Q.save();
				return res.send(Q);
			} else {
				console.log("2");
				Q.downvotes.push(req.user._id);
				if (Q.upvotes.includes(req.user._id)) {
					var userIdIndex = Q.upvotes.indexOf(req.user._id);
					Q.upvotes.splice(userIdIndex, 1);
				}
				Q.save();
				return res.send(Q);
			}
		});
});

router.put("/upvoteA", isUserAuthenticated, async (req, res) => {
	console.log("upvote answer", req.body);
	await Question.findById(req.body.questionId)
		.exec()
		.then((Q) => {
			// console.log(Q.answers);
			const curr_id_ans = req.body.answerId;

			var index;
			for (var i = 0; i < Q.answers.length; i++) {
				const curr = Q.answers[i]._id.toString();
				if (curr_id_ans === curr) {
					index = i;
					break;
				}
			}
			if (Q.answers[index].upvotes.includes(req.user._id)) {
				console.log("1");

				var userIdIndex = Q.upvotes.indexOf(req.user._id);
				Q.answers[index].upvotes.splice(userIdIndex, 1);
				Q.save();
				return res.send(Q.answers[index]);
			} else {
				console.log("2");
				Q.answers[index].upvotes.push(req.user._id);
				if (Q.answers[index].downvotes.includes(req.user._id)) {
					var userIdIndex = Q.downvotes.indexOf(req.user._id);
					Q.answers[index].downvotes.splice(userIdIndex, 1);
				}
				Q.save();
				return res.send(Q.answers[index]);
			}
		});
});
router.put("/downvoteA", isUserAuthenticated, async (req, res) => {
	console.log("downvote answer", req.body);
	await Question.findById(req.body.questionId)
		.exec()
		.then((Q) => {
			const curr_id_ans = req.body.answerId;

			var index;
			for (var i = 0; i < Q.answers.length; i++) {
				const curr = Q.answers[i]._id.toString();
				if (curr_id_ans === curr) {
					index = i;
					break;
				}
			}
			if (Q.answers[index].downvotes.includes(req.user._id)) {
				console.log("1");
				var userIdIndex = Q.answers[index].downvotes.indexOf(req.user._id);
				Q.answers[index].downvotes.splice(userIdIndex, 1);
				Q.save();
				return res.send(Q.answers[index]);
			} else {
				console.log("2");
				Q.answers[index].downvotes.push(req.user._id);
				if (Q.answers[index].upvotes.includes(req.user._id)) {
					var userIdIndex = Q.answers[index].upvotes.indexOf(req.user._id);
					Q.answers[index].upvotes.splice(userIdIndex, 1);
				}
				Q.save();
				return res.send(Q.answers[index]);
			}
		});
});

module.exports = router;
