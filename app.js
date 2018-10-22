'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;
const routes = require('./routes');
const logger = require('morgan');

// assign port from environment variable or default to 3000
const port = process.env.PORT || 3000;

//incldue jsonParser on the app
app.use(jsonParser());
//include morgan with the dev passed in
app.use(logger('dev'));

app.use('/questions', routes);

// start app listening on port
app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});




