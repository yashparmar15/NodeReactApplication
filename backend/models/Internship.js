const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internshipSchema = new Schema({
  yearOfInternship: {
    type: Number,
  },
  companyName: {
    type: String,
  },
  jobProfile: {
    type: String,
  },

  interview: {
    type: String,
  },

  topicsCovered: {
    type: String,
  },

  internshipBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;
