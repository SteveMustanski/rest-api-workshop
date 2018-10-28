'use strict'

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// sort function to sort anwers properly
let sortAnswers = function (a, b) {
  // negative if a before b
  // 0 no change
  // postive if a after b
  if (a.votes === b.votes) {
      return b.updatedAt - a.updatedAt;
    } 
  return b.votes - a.votes
}

// Set up the answer Schema
let AnswerSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
});

// Set up the Question Schema
let QuestionSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  answers: [AnswerSchema]
});

// pre save callback to have mongoose sort entries prior to saving
QuestionSchema.pre('save', (next) => {
  // pass in sort method to tell js how to sort the document
  this.answers.sort(sortAnswers);
  next();
})


let Question = mongoose.model('Question', QuestionSchema);

model.exports.Question = Question;