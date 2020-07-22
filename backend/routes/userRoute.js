const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.post('/user-profile', upload.single('picture'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  // console.log(req);
  // console.log(req.file);
  const pictureI = url + '/' + req.file.path;
  // console.log(req.body.id)
  User.findByIdAndUpdate({ _id: req.body.id }, { picture: pictureI }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get('/getall', (req, res, next) => {
  Student.find({}, (err, result) => {
    if (err) console.log(err);
    else {res.json(result)};
  });
});



router.get('/getuserinfo', (req, res, next) => {
  // console.log(req.query)
    Student.findOne({'id' :req.query.id},(err,result)=>{
      if(err) console.log(err);
      else{ res.send(result)};
    })
});

router.get('/getuserpicture', (req, res, next) => {
    User.findOne({'_id' :req.query.id},'picture',(err,result)=>{
      if(err) console.log(err);
      else{ res.send(result)};
    })
});



router.get('/getallusers', (req, res, next) => {
  User.find({}, (err, result) => {
    if (err) console.log(err);
    else res.json(result);
  });
});

router.post('/change', (req, res, next) => {
  // console.log(req.body.dataUser)
  Student.findByIdAndUpdate(
    { _id: req.body.dataUser._id },
    { about: req.body.dataUser.about },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/addtodo', (req, res, next) => {
  // console.log(req.body.dataUser)
  // console.log(req.body.C.todo);
  // console.log(req.body.C._id)
  Student.findByIdAndUpdate(
    { _id: req.body.C._id },
    { todo: req.body.C.todo },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/adddone', (req, res, next) => {
  // console.log(req.body.dataUser)
  // console.log(req.body.C.done);
  // console.log(req.body.C._id)
  Student.findByIdAndUpdate(
    { _id: req.body.C._id },
    { done: req.body.C.done },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/adddoing', (req, res, next) => {
  // console.log(req.body.dataUser)
  // console.log(req.body.C.done);
  // console.log(req.body.C._id)
  Student.findByIdAndUpdate(
    { _id: req.body.C._id },
    { doing: req.body.C.doing },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/updateuser', (req, res, next) => {
  Student.findByIdAndUpdate(
    { _id: req.body.Current._id },
    {
      name: req.body.Current.name,
      email: req.body.Current.email,
      phone: req.body.Current.phone,
      linkedin: req.body.Current.linkedin,
      github: req.body.Current.github,
      exp: req.body.Current.exp,
      college: req.body.Current.college,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/changeskills', (req, res, next) => {
  // console.log(req.body.dataUser)
  Student.findByIdAndUpdate(
    { _id: req.body.dataUser._id },
    { skills: req.body.dataUser.skills },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/', (req, res, next) => {
  // console.log(req.body.dataUser);
  Student.create(req.body.dataUser, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data)
      res.json(data);
    }
  });
});

module.exports = router;
