'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MaltSchema = mongoose.Schema({
    maltName: {
        type: String,
        required: true,
        unique: false
    },
    maltMeasurement: {
        type: String,
        required: true,
        unique: false
    },
    brewId: {
        type: String,
        required: true,
        unique: true
    }
});

MaltSchema.methods.serialize = function() {
    return{
        name: this.name || '',
        measurement: this.measurement || ''
    };
};

const Malt = mongoose.model('Malt', MaltSchema);

module.exports = {Malt};