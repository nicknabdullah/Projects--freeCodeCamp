// init project
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

// html for homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Mount body-parser middleware before any routes that need it
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define URL schema and model
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true }
});
const Url = mongoose.model('Url', urlSchema);

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
  dns.lookup(parsed.hostname, async (error) => {
    if (error) {
      return res.json({ error: 'invalid url' });
    } else {
      try {
        // Check if the URL already exists in the database
        const existingUrl = await Url.findOne({ original_url: url });
        if (existingUrl) {
          return res.json({ original_url: url, short_url: existingUrl.short_url });
        }

        // Get current document count, and increment the URL counter for a new short URL
        const count = await Url.countDocuments();
        const newUrl = new Url({
          original_url: url,
          short_url: count + 1
        });

        // Save the new URL to the database
        const savedUrl = await newUrl.save();
        const shortUrl = savedUrl.short_url;
        res.json({ original_url: url, short_url: shortUrl });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to save URL' });
      }
    }
  });
});

// Redirect to original URL
app.get('/api/shorturl/:short_url', async (req, res) => {
  // Validate that short_url is a number
  if (!/^\d+$/.test(req.params.short_url)) {
    return res.json({ error: 'invalid url' });
  }
  const shortUrl = parseInt(req.params.short_url);

  if (isNaN(shortUrl)) {
    return res.json({ error: 'invalid url' });
  }

  try {
    const foundUrl = await Url.findOne({ short_url: shortUrl });
    if (foundUrl) {
      res.redirect(foundUrl.original_url);
    } else {
      res.json({ error: 'No short URL found for given input' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
