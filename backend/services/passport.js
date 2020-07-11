const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },

    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ email: profile._json.email }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture,
            email: profile._json.email,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);

// GITHUB STRATEGY
passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: '/auth/github/callback',
    },

    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      console.log('Profile: ', profile);
      User.findOne({ email: profile._json.email }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            userId: profile._json.id,
            username: profile._json.name,
            picture: profile._json.avatar_url,
            email: profile._json.email,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
