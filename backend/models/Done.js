const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoneSchema = new Schema({
  task: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

const Done = mongoose.model('Done', DoneSchema);
module.exports = Done;