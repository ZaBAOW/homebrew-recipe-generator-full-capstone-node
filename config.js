'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://uziekiel:willyb2025@ds145304.mlab.com:45304/homebrew-recipe-generator';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
