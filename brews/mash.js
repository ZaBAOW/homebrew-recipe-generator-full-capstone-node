'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MashSchema = mongoose.Schema({
    Schedule: {
        type: String,
        required: true,
        unique: false
    }
});

MashSchema.methods.serialize = function() {
    return {
        schedule: this.schedule || ''
    };
};

const Mash = mongoose.model('Mash', MashSchema);

module.exports = {Mash}