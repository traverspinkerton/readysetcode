const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const User = require('./db');

const app = express();

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// All API endpoints under '/api'
app.get('/api/users', (req, res) => {
  // get all users
  User.find((err, users) => {
    if (err) return console.error(err);

    // return as json
    res.json(users);
    console.log(`Sent ${users.length} users`);
  })
});

app.post('/api/users', /*upload.single('image'),*/ (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) return console.error(err);
    console.log(`Saved ${user.name} as a new user in our database!`);
    res.json(req.body);
  });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);
