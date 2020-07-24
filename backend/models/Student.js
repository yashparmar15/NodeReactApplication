const mongoose = require('mongoose');
// const { batch } = require("react-redux");
require('mongoose-type-url');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  id : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  name: {
    type: String,
    required: true
  },
  gender :{
    type:String,
    required:true
  },
  email :{
    type:String,
    required : true
  },
  college: {
    type: String,
    required: true
  },
  github: {
    type: String,
    default : "NaN",
  },
  linkedin: {
    type: String,
    default : "NaN",
  },
  about: {
    type: String
  },
  year: {
    type: Number,
    required: true
  },
  exp: Number,
  branch: {
    type: String,
    required : true
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  views_on_profile: {
    type: Number,
    default: 0
  },
  skills: [{
    type: String
  }],
  phone: {
    type: String,
    default : "NaN",
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project"
  }],
  likes: {
    type: Number,
    default: 0
  },
  joindate: {
    type: Date,
    default: Date.now()
  },
  // posts: {
  // 	type: [PostSchema],
  // },
  todo: [{
      task : {
        type:String,
      },
      description : {
        type:String,
      }
  }],
  done: [{
    task : {
      type:String,
    },
    description : {
      type:String,
    }
  }],
  doing: [{
    task : {
      type:String,
    },
    description : {
      type:String,
    }
  }],
  follows:[{
      type: String
  }],
  followedby : [{
      type:String,

  }]
});


const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;