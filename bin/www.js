"use strict";


const app = require("../app.js");

app.listen(process.env.PORT || 8080, () => {
    console.log("서버 가동");
});

//헤로쿠 잠들지 않게 하기
const http = require("http");
setInterval(function(){
    console.log("20분 경과, 서버를 부릅니다.");
    http.get("https://kiwi-school.herokuapp.com/");    
}, 1200000);