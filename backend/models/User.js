const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  username: String,
  picture: String,
  email: String,
  flag : {
    type : Boolean,
    default : true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;