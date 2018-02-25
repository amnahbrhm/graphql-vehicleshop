const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicle = new Schema({
    carname: String,
    year: Number,
    transmission: String,
    fuelType: String,
    engineCapacity: Number
});

module.exports = mongoose.model('vehicle', vehicle);