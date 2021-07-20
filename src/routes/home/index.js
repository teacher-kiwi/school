"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/result_page", ctrl.output.result);

router.post("/result_page", ctrl.process.result);

module.exports = router;