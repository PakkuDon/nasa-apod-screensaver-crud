var express = require('express');
var app = express();
var fetch = require('isomorphic-fetch');
var db = require('./db');
const API_KEY = require('./apod_key');

app.use(express.static('public'));

// GET /
// Display screensaver
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// GET /api/pictures
// Fetch images for screensaver
app.get('/api/pictures', (req, res) => {
  db.query('select * from pictures')
    .then(data => {
      res.status(200).json(data);
    });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
