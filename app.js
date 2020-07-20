'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;