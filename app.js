var express = require('express');
var fetch = require('isomorphic-fetch');
var moment = require('moment');
var app = express();
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

// GET /api/pictures/load
// Fetch images from APOD API and store in database
app.get('/api/pictures/load', (req, res) => {
  // Generate dates from last few weeks
  var dates = [];
  var date = moment();
  date.subtract(1, 'days');
  for (var i = 0; i < 10; i++) {
    dates.push(date.format('YYYY-MM-DD'));
    date.subtract(1, 'weeks');
  }

  // Get pictures for these days
  var urls = dates.map(date => `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
  Promise.all(urls.map(url => {
    return fetch(url)
      .then(res => res.json());
    }))
    .then(images => {
      Promise.all(images.map(image => {
        return db.none('INSERT INTO pictures(title, explanation, url) VALUES($1, $2, $3)', [
          image.title, image.explanation, image.hdurl
        ]);
      }))
      .then(() => {
        res.status(200).send('Images fetched successfully');
      })
    });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
