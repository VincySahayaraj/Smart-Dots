const mongoose = require('mongoose');

const distancePricing = new mongoose.Schema({
  startDistance: {
    type: Number,
    required: true,
  },
  endDistance: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('DistancePricing', distancePricing);