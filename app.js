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

//middleware for errors
// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

// custom error handler
// expres knows this is error handler because of the 4 parameters
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});


// start app listening on port
app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});




