'use strict'

const express = require('express');
const router = express.Router();
const Question = require("./models").Question;

router.param('qId', (req, res, next, id) => {
  Question.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error('Not found');
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param('aId', (req, res, next, id) => {
  req.answer = req.questons.anwers.id(id);
  if (!req.answer) {
    err = new Error('Not found');
    err.status = 404;
    return next(err);
  }
  next();
});

// GET /questions
// route for questions collection
router.get('/', (req, res, next) => {
  Question.find({})
    .sort({ createdAt: -1 })
    .exec((err, questions) => {
      if (err) return next(err);
      res.json(questions);
    });
});

// POST /questions
// route for creating questions
router.post('/', (req, res, next) => {
  let question = new Question(req.body);
  question.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/:id
// route for specific question
router.get('/:qId', (req, res, next) => {
  res.json(req.question);
});

// POST /questions/:id/answers
// route for creating answers
router.post('/:qId/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.quesiton.save((err, question) => {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:qId/answers/:aId
// route for editing specific answer
router.put('/:qId/answers/:aId', (req, res) => {
  req.answer.update(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

// DELETE /questions/:qId/answers/:aId
// route for deleting specific answer
router.delete('/:qId/answers/:aId', (req, res) => {
  req.answer.remove((err) => {
    req.question.save((err, quesiton) => {
      if (err) return next(err);
      res.json(question);
    });
  });
});

// POST /questions/:qId/answers/:aId/vote-up
// POST /questions/:qId/answers/:aId/vote-down
// route for voting on specific answer
router.post('/:qId/answers/:aId/vote-:dir', (req, res, next) => {
  // check that the dir is = to up or down using regex
  if (req.params.dir.search(/^(up|down)$/) === -1) {
    let err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    req.vote = req.params.dir;
    next();
  }
}, (req, res, next) => {
  req.answer.vote(req.vote, (err, question) => {
    if (err) return next(err);
    res.json(question);
  });
});

module.exports = router;