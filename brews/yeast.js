'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const YeastSchema = mongoose.Schema({
    yeastName: {
        type: String,
        required: true,
        unique: false
    },
    yeastMeasurement: {
        type: String,
        required: true,
        unique: false
    },
    yeastSchedule: {
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

YeastSchema.methods.serialize = function() {
    return {
        name: this.name || '',
        measurement: this.measurement || '',
        schedule: this.schedule || ''
    };
};

const Yeast = mongoose.model('Yeast', YeastSchema);

module.exports = {Yeast};