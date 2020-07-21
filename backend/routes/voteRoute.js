const express = require('express');
const router = express.Router();
const Question = require('../models/Questions');

function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

router.put('/upvote', isUserAuthenticated, async (req, res) => {
  console.log('upvote', req.body);
  await Question.findById(req.body.questionId)
    .exec()
    .then((Q) => {
      if (Q.upvotes.includes(req.user._id)) {
        console.log('1');

        var userIdIndex = Q.upvotes.indexOf(req.user._id);
        Q.upvotes.splice(userIdIndex, 1);
        Q.save();
        return res.send(Q);
      } else {
        console.log('2');
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
router.put('/downvote', isUserAuthenticated, async (req, res) => {
  console.log('downvote', req.body);
  await Question.findById(req.body.questionId)
    .exec()
    .then((Q) => {
      if (Q.downvotes.includes(req.user._id)) {
        console.log('1');
        var userIdIndex = Q.downvotes.indexOf(req.user._id);
        Q.downvotes.splice(userIdIndex, 1);
        Q.save();
        return res.send(Q);
      } else {
        console.log('2');
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

module.exports = router;
