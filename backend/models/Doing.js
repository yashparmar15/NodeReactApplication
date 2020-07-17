const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoingSchema = new Schema({
  task: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

const Doing = mongoose.model('Doing', DoingSchema);
module.exports = Doing;