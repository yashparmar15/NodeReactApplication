const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnswerSchema = require('./Answers');

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  views: {
    type: Number,
  },
  upvotes: {
    type: Number,
  },
  downvotes: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },

  // askedBy: mongoose.Schema.ObjectId,
  askedBy: {
    type: String,
  },

  answers: [{
    type: Schema.Types.ObjectId,
    ref:"Answer"
  }],
  tags: [{
    type: String,
  }],
});

mongoose.model('questions', QuestionSchema);
