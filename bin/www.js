"use strict";


const app = require("../app.js");

app.listen(process.env.PORT || 8080, () => {
    console.log("서버 가동");
});