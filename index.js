const express = require('express')
const app = express()
// const port = 3000

// app.get('/', (req, res) => {res.send('과연 될까?')})
app.get('/', function(req, res){
  return res.send('이것도 될까?')
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

app.listen(process.env.PORT || 8080)