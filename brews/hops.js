'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const HopsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    measurement: {
        type: String,
        required: true,
        unique: false
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