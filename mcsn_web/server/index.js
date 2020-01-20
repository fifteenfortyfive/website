const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();

const SERVICE_CONFIG = require('../../.services.json').mcsn_web;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

app.listen(SERVICE_CONFIG.port, function() {
  console.log(`App is running at localhost: ${SERVICE_CONFIG.port}`);
});
