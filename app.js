const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/add", (req, res) => {
  console.log("회원가입 시도");
  console.log(req.body);

  db.collection("post").findOne({ _id: req.body.id }, (error, result) => {
    if (result === null) {
      res.send("가입되었습니다.");
      console.log("가입 성공!");
      db.collection("post").insertOne({ _id: req.body.id, pw: req.body.pw });
    } else {
      res.send("존재하는 id입니다.");
      console.log("가입 실패!");
    }
  });
});
app.post("/login", (req, res) => {
  console.log("로그인 시도");
  console.log(req.body);

  db.collection("post").findOne(
    { _id: req.body.id, pw: req.body.pw },
    (error, result) => {
      if (result === null) {
        res.send("로그인에 실패하였습니다.");
        console.log("로그인 실패!");
      } else {
        res.send("로그인 되었습니다.");
        console.log("로그인 성공!");
      }
    }
  );
});

const mongodb = `mongodb+srv://${process.env.MONGODBID}:${process.env.MONGODBPW}@cluster.ycwtg.mongodb.net/${process.env.MONGODB}?retryWrites=true&w=majority`;

let db;

MongoClient.connect(mongodb, { useUnifiedTopology: true }, (error, client) => {
  if (error) return console.log("ERROR!");
  db = client.db(process.env.MONGODB);

  app.listen(process.env.PORT || 3000, () => {
    console.log("서버 가동!");
  });
});
