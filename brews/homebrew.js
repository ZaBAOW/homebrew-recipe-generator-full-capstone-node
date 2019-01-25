'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const BrewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    abv: {
        type: String,
        required: true,
        unique: false
    },
    id: this._id
});

BrewSchema.methods.serialize = function() {
    return {
        title: this.title || '',
        abv: this.abv || ''
    };
};
    
const Brew = mongoose.model('Brew', BrewSchema);

module.exports = {Brew};
