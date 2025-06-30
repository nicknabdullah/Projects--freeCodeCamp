// init project
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');

// Storage for URLs for redirection
const urlDatabase = {};
let urlCounter = 1;

const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

// html for homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Mount body-parser middleware before any routes that need it
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/shorturl', function (req, res) {
  const url = req.body.url;

  // Validate URL format (must start with http:// or https://)
  let parsed;
  try {
    parsed = new URL(url);
  } catch (e) {
    return res.json({ error: 'invalid url' });
  }
  if (!/^https?:\/\//.test(url)) {
    return res.json({ error: 'invalid url' });
  }

  // Use dns.lookup to verify the hostname
  dns.lookup(parsed.hostname, (err) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    } else {
      // Store the URL and generate a short URL
      const shortUrl = urlCounter++;
      urlDatabase[shortUrl] = url;
      res.json({ original_url: url, short_url: shortUrl });
    }
  });
});

// Redirect to original URL
app.get('/api/shorturl/:short_url', function (req, res) {
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found for given input' });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
