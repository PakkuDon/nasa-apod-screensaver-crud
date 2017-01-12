var express = require('express');
var app = express();
var fetch = require('isomorphic-fetch');
var db = require('./db');

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
