const express = require('express');
const app = express();
const fs = require('fs');
// const port = 3000

const template = `오 신기하구만`





// app.get('/', (req, res) => {res.send('과연 될까?')})
app.get('/', function(req, res){
  return res.send(template);
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

app.listen(process.env.PORT || 8080)