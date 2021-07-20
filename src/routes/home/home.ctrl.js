"use strict";

const Result = require("../../models/Result");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    result: (req, res) => {
        const result = new Result(req.query);
        res.render("home/result", result.get());
    },
}

const process = {
    result: (req, res) => {
        const result = new Result(req.body);
        res.render("home/result", result.post());
    },
}

module.exports = { output, process };