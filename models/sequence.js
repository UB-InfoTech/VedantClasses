const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
