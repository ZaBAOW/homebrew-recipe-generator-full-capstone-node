'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://uziekiel:willyb2025@ds145304.mlab.com:45304/homebrew-recipe-generator';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://Uziel:willyb1234@ds213255.mlab.com:13255/homebrewtest'
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'confidential';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';