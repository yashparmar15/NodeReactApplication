const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  username: String,
  picture: String,
  email: String,
});

mongoose.model('users', userSchema);
