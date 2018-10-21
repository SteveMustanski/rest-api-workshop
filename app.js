'use strict';

const express = require('express');
const app = express();

// assign port from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server is listening on port: ${port}`);
});



