// init project
require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');   // enable CORS so API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  // get the user's IP address
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // get the user's language
  var language = req.headers['accept-language'];
  // get the user's software
  var software = req.headers['user-agent'];
  res.json({ ipaddress: ip, language: language, software: software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
