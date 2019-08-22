"use strict";

const mongoose = require("mongoose");

const userLoggedSchema = new mongoose.Schema({
  userLoggedIn: String
});

const Logged = mongoose.model("session", userLoggedSchema);

exports.Logged = Logged;