const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const ProjectSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  tags: {
    type: [String],
  },

  projectBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  githubLink: {
    type: String,
    required: true,
  },
  deploymentLink: {
    type: String,
  },
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
