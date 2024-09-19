const mongoose = require('mongoose');


const truckdetailsSchemea = new mongoose.Schema({

    registrationNumber: {
        type: String,
        required: true,
        unique: true
      },
      make: {
        type: String,
        required: true
      },
      model: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      capacity: {
        payload_capacity: {
          type: String,
          required: true
        },
        gross_vehicle_weight: {
          type: String,
          required: true
        }
      }
});

module.exports = mongoose.model('Truckdetails', truckdetailsSchemea);