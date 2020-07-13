const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

mongoose.model('todo', TodoSchema);
