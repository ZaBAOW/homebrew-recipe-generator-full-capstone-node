'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MashSchema = mongoose.Schema({
    mashSchedule: {
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

MashSchema.methods.serialize = function() {
    return {
        schedule: this.schedule || ''
    };
};

const Mash = mongoose.model('Mash', MashSchema);

module.exports = {Mash}