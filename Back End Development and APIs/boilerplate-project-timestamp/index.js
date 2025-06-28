// init project
var express = require('express');
var app = express();

// Basic setup
var cors = require('cors'); // cors for fCC remote testing
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// For empty param, return current date
// Adding this route before /api/:date
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Handle get request
app.get("/api/:date", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // Regex for valid unix timestamp (integer, positive or negative)
  const unixTimestampRegex = /^-?\d+$/;

  // If all digits, treat as unix timestamp
  if (unixTimestampRegex.test(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    // Try to parse any date string
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});