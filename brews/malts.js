'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MaltSchema = mongoose.Schema({
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

MaltSchema.methods.serialize = function() {
    return{
        name: this.name || '',
        measurement: this.measurement || ''
    };
};

const Malt = mongoose.model('Malt', MaltSchema);

module.exports = {Malt};