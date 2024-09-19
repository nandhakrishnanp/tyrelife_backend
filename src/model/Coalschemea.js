const mongoose = require('mongoose');

// Define the schema for nearby locations
const nearbyLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  road_quality: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Moderate', 'Poor'],
    required: true
  },
  health_percentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  }
});

// Define the schema for the coal mine and its nearby locations
const coalMineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  nearby_locations: [nearbyLocationSchema]
});

// Create the model from the schema
const CoalMine = mongoose.model('CoalMine', coalMineSchema);

module.exports = CoalMine;
