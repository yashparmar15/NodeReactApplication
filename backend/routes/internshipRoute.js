const express = require('express');
const router = express.Router();
// const Question = require('../models/Questions');
const Internship = require('../models/Internship');

function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

router.post('', isUserAuthenticated, async (req, res) => {
  const yearOfInternship = req.body.yearOfInternship;
  const companyName = req.body.companyName;
  const jobProfile = req.body.jobProfile;
  const interview = req.body.interview;
  const topicsCovered = req.body.topicsCovered;
  const internshipBy = req.user;
  const name = req.user.username;
  console.log(
    yearOfInternship,
    companyName,
    jobProfile,
    interview,
    topicsCovered,
    internshipBy,
    name
  );

  new Internship({
    yearOfInternship,
    companyName,
    jobProfile,
    interview,
    topicsCovered,
    internshipBy,
    name,
  })
    .save()
    .then(() => {
      console.log('Internship Saved');
      return res.status(200);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500);
    });
});

router.get('', async (req, res) => {
  var sort = { name: 1 };
  const AllInternships = await Internship.find({})
    .populate('internshipBy')
    .sort(sort);
  res.status(200).send(AllInternships);
});

module.exports = router;
