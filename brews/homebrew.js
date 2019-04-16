'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const BrewSchema = mongoose.Schema({
    brewName: {
        type: String,
        required: true,
        unique: false
    },
    abv: {
        type: String,
        required: true,
        unique: false
    },
    userId: {
        type: String,
        unique: false
    }
});

BrewSchema.virtual('categoryId').get(function() {
    return this._id;
})

BrewSchema.methods.serialize = function() {
    return {
        brewName: this.brewName || '',
        abv: this.abv || '',
        userId: this.userId,
        brewId: this._id
    };
};
    
const Brew = mongoose.model('Brew', BrewSchema);

module.exports = {Brew};
