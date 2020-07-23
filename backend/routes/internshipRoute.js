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
  // console.log(projectBy);

  new Internship({
    yearOfInternship,
    companyName,
    jobProfile,
    interview,
    topicsCovered,
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
  const AllInternships = await Internship.find({});
  res.status(200).send(AllInternships);
});

module.exports = router;
