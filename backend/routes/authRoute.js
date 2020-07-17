const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose')
const User = require('../models/User');
const router = express.Router();


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

module.exports = router;