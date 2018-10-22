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
router.get('/:qId', (req, res) => {
  res.json({
    response: `You sent me a GET request for id: ${req.params.qId}`
  });
});

// POST /questions/:id/answers
// route for creating answers
router.post('/:qId/answers', (req, res) => {
  res.json({
    response: 'You sent me a POST request to /answers',
    questionId: req.params.qId,
    body: req.body
  });
});

// PUT /questions/:qId/answers/:aId
// route for editing specific answer
router.put('/:qId/answers/:aId', (req, res) => {
  res.json({
    response: 'You sent me a PUT request to /answers',
    questionId: req.params.qId,
    answerId: req.params.aId,
    body: req.body
  });
});

// DELETE /questions/:qId/answers/:aId
// route for deleting specific answer
router.delete('/:qId/answers/:aId', (req, res) => {
  res.json({
    response: 'You sent me a PUT delete to /answers',
    questionId: req.params.qId,
    answerId: req.params.aId
  });
});

// POST /questions/:qId/answers/:aId/vote-up
// POST /questions/:qId/answers/:aId/vote-down
// route for voting on specific answer
router.post('/:qId/answers/:aId/vote-:dir', (req, res, next) => {
  // check that the dir is = to up or down using regex
  if(req.params.dir.search(/^(up|down)$/) === -1) {
    let err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
}, (req, res) => {
  res.json({
    response: `You sent me a post to /vote-${req.params.dir}`,
    questionId: req.params.qId,
    answerId: req.params.aId,
    vote: req.params.dir
  });
});



module.exports = router;