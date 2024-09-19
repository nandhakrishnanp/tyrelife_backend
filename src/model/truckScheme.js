const mongoose = require('mongoose');



const truckSchemea = new mongoose.Schema({
  
    registrationNumber: {
        type: String,
        required: true,
        rel: 'Truckdetails',
    },
    tyrePressure: {
        type: Number,
        required: true
    },
    payload: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    location: {
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

module.exports = mongoose.model('Truck', truckSchemea);