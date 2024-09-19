const mongoose = require('mongoose');

const tkphDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  tkph: {
    type: Number,
    required: true
  }
});

const Tkphschema = new mongoose.Schema({
  truck: {
    type: String,
    required: true,
    unique: true
  },
  tkph_data: {
    type: [tkphDataSchema],
    required: true
  }
});

const Tkph = mongoose.model('Tkph', Tkphschema);

module.exports = Tkph;
