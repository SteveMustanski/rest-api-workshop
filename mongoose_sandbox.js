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
    type: { type: String, default: 'goldfish' },
    size: { type: String, default: 'small' },
    color: { type: String, default: 'golden' },
    mass: { type: Number, default: .007 },
    name: { type: String, default: 'Angela' }
  });

  let Animal = mongoose.model('Animal', AnimalSchema);

  // create elephant 
  let elephant = new Animal({
    type: 'elephant',
    size: 'big',
    color: 'gray',
    mass: 6000,
    name: 'Lawrence'
  });

  // create default animal
  let animal = new Animal({});

  // create whale 
  let whale = new Animal({
    type: 'whale',
    size: 'big',
    color: 'black',
    mass: 150000,
    name: 'Beureguaurd'
  });

  // remove all animals from the db
  // then create the new animals
  Animal.remove({}, (err) => {
    if (err) {
      console.error(`Remove failed: ${err}`);
    } else
      // save the elephant
      elephant.save((err) => {
        if (err) {
          console.error(`Save failed: ${err}`);
        } else console.log('record saved!');
        // save default animal
        animal.save((err) => {
          if (err) {
            console.error(`Save failed: ${err}`);
          } else console.log('record saved!');
          whale.save((err) => {
            if (err) {
              console.error(`Save failed: ${err}`);
            } else console.log('record saved!');
            // get and print all big animals
            Animal.find({ size: 'big' }, (err, animals) => {
              if (err) {
                console.log(`There was an error finding animals ${err}`);
              } else 
                animals.forEach((animal) => {
                  console.log(`${animal.name} the ${animal.color} ${animal.type}`);
                });
                    db.close(() => {
                      console.log('db connection closed');
                });
            });
          });
        });
      });
  });
});