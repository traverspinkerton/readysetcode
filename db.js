const mongoose = require('mongoose');
mongoose.connect('mongodb://travers:itshighnoon@ds147534.mlab.com:47534/readysetcode');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('great success! we are connected to our database.')
});

const userSchema = mongoose.Schema({
  name: String,
  description: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
