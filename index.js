const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const User = require('./db');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.post('/api/users/image', (req, res) => {
  console.log(req.body);

  // set as env variable
  const CLOUDINARY_URL= 'https://api.cloudinary.com/v1_1/dqik7vajf';
  const CLOUDINARY_UPLOAD_PRESET= 'zy2frnkx';

  axios({
    url: 'api/users/image',
    method: 'POST',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    body: req.body
  })
    .then(succes => res.send(succes))
    .catch(error => res.send(error));
});

// The "catchall" handler: for any request that does not match one of the above
// send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);
