"use strict";

class Result {
    constructor(body) {
        this.body = body;
    }

    get() {
        const id = this.body.id,
            age = this.body.age;
        console.log("get request");
        return { id: id, age: age, method: "GET" };
    }

    post() {
        const id = this.body.id,
            age = this.body.age;
        console.log("post request");
        return { id: id, age: age, method: "POST" };
    }
}

module.exports = Result;