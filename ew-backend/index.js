const express = require("express");
const consign = require("consign");

const app = express();

consign()
    .include("libs/config.js")
    .then("db.js")
    .then("libs/middlewares.js")
    .then("rotas")
    .then("libs/boot.js")
    .into(app);

module.exports = app;