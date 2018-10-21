'use strict'

const express = require('express');
const router = express.Router();

// GET /questions
// route for questions collection
router.get('/', (req, res) => {
  res.json({response: 'You sent me a GET request'});
});

// POST /questions
// route for creating questions
router.post('/', (req, res) => {
  res.json({
    response: 'You sent me a POST request',
    body: req.body
  });
});

// GET /questions/:id
// route for specific question
router.get('/:id', (req, res) => {
  res.json({
    response: `You sent me a GET request for id: ${req.params.id}`
  });
});




module.exports = router;