'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const YeastSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    measurement: {
        type: String,
        required: true,
        unique: false
    },
    schedule: {
        type: String,
        required: true,
        unique: false
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