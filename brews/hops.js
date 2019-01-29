'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const HopsSchema = mongoose.Schema({
    hopsName: {
        type: String,
        required: true,
        unique: false
    },
    hopsMeasurement: {
        type: String,
        required: true,
        unique: false
    },
    brewId: {
        type: String,
        require: true,
        unique: true
    }
});

HopsSchema.methods.serialize = function() {
    return {
        name: this.name || '',
        measurement: this.measurement || ''
    };
};

const Hops = mongoose.model('Hops', HopsSchema);

module.exports = {Hops};