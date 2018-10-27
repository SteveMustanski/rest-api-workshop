'use strict'

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Set up the answer Schema
let AnswerSchema = new Schema ({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default:0}
})

// Set up the Question Schema
let QuestionSchema = new Schema ({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
})

//
let Question = mongoose.model('Question', QuestionSchema);

model.exports.Question = Question;