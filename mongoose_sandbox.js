'use strict';

const mongoose = require('mongoose');

// create mongoose connection
// 27017 is the default mongo port
mongoose.connect('mongodb://localhost:27017/sandbox', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`connection error: ${err}`)
});

db.once('open', () => {
  console.log(`db connection successfull`);
  // all database communication code goes here

  const Schema = mongoose.Schema;
  let AnimalSchema = new Schema({
    type: String,
    size: String,
    color: String,
    mass: Number,
    name: String
  });

  let Animal = mongoose.model('Animal', AnimalSchema);

  let elephant = new Animal({
    type: 'elephant',
    size: 'big',
    color: 'gray',
    mass: 6000,
    name: 'Lawrence'
  });

  elephant.save( (err) => {
    if (err) {
      console.error(`Save failed: ${err}`);
    } else console.log('record saved!');
    db.close(() => {
      console.log('db connection closed');
    });
  });


});