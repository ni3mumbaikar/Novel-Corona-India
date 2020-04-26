const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/ni3mumbaikar',function(req,res){
    res.send('Oh you got the developer name correct')
})
 
app.listen(3000)
console.log('listening on port 3000')