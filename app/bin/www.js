"use strict";

const PORT = 8080;

const app = require("../app.js");

app.listen(PORT, () => {
    console.log("서버 가동");
});