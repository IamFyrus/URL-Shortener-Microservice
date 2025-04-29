require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  const original_url = req.body.url;

  // Validate URL format: must start with http:// or https://
  const urlRegex = /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/.*)?$/;
  if (!urlRegex.test(original_url)) {
    return res.json({ error: 'invalid url' });
  }

  // Generate a short URL as a random integer and store the mapping
  const shortUrl = Math.floor(Math.random() * 1000000);
  urlDatabase[shortUrl] = original_url;

  res.json({ original_url: original_url, short_url: shortUrl });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];
  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
