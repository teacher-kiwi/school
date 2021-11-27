const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/school", (req, res) => {
  res.sendFile(`${__dirname}/school.html`);
});
app.listen(process.env.PORT || 3000);
