const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose')
const User = require('../models/User');
const router = express.Router();
const Question = require('../models/Questions');


router.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
router.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['user: email'],
    })
  );

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      if(req.user.flag){
        console.log(req.user)
        const dummy = req.user;
        dummy['flag'] = false;
        User.findByIdAndUpdate(req.user._id,dummy,{runValidators : true},(err,response)=>{
          if(err)
            console.log(err);  
        });
        res.redirect(`/info`);
      }
      else
        res.redirect('/')
    }
);
router.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
      if(req.user.flag){
        console.log(req.user)
        const dummy = req.user;
        dummy['flag'] = false;
        User.findByIdAndUpdate(req.user._id,dummy,{runValidators : true},(err,response)=>{
          if(err)
            console.log(err);  
        });
        res.redirect(`/info`);
      }
      else
        res.redirect('/')
    }
  );

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

router.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect(`/`);
});


  router.post('/api/questions', async (req, res, next) => {
    const content = await req.body.content;
    const question = await req.body.question;
    const tags = await req.body.allTags;
    const askedBy = await req.user;
    // console.log(req.body);
    // console.log('Question:', question);
    // console.log('DraftJS:', content);
    // console.log('Tags:', tags);
    if (question) {
      new Question({
        title: question,
        description: content,
        askedBy: askedBy,
        tags: tags,
      })
        .save()
        .then(() => {
          console.log('Saved!');
        })
        .catch((err) => console.log(err));
    }

    res.redirect('/questions');
    //
  });

  router.post('/api/questions/:id', async (req, res, next) => {
    const answer = await req.body.answer;

    const id = req.params.id;
    // console.log('Answer:', answer);
    // console.log(id);
    // console.log(req.user.username);

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

    res.redirect('/questions');
    //
  });

  router.get('/api/questions', async (req, res) => {
    await Question.find()
      .populate('askedBy')
      .then((questions) => {
        // console.log(questions)
        res.send(questions);
      })
      .catch((err) => console.log(err));
  });

  router.get('/api/logout', async (req, res) => {
    await req.logout();
    req.session = null;
    res.clearCookie('ayan', { path: '/', httpOnly: true });
    res.clearCookie('ayan.sig', { path: '/', httpOnly: true });
    // res.clearCookie('session', { path: '/', httpOnly: true });
    // res.clearCookie('session.sig', { path: '/', httpOnly: true });
    res.redirect('/');
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
