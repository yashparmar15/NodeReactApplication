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

mongoose.model('done', DoneSchema);
