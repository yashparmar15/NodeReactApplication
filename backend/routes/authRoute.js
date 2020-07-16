const passport = require('passport');
const Question = require('../models/Questions');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  app.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['user: email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(`/`);
    }
  );
  app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
      res.redirect(`/`);
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/questions', async (req, res, next) => {
    const content = await req.body.content;
    const question = await req.body.question;

    console.log('Question:', question);
    console.log('DraftJS:', content);
    if (question) {
      new Question({
        title: question,
        description: content,
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

  app.get('/api/questions', (req, res) => {
    Question.find({})
      .sort({
        date: 'desc',
      })
      .then((questions) => {
        res.send(questions);
      });
  });

  app.get('/api/logout', async (req, res) => {
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

  // app.get('/profile/:id', isUserAuthenticated, (req, res, next) => {
  //   res.send('You have reached the secret route');
  // });
};
