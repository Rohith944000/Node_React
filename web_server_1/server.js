'use strict'

// let http = require('http')

// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type': 'text/html'})
//     res.write('<h1>Hello world</h1>')
//     res.end()
// }).listen(8000)
//console.log('server listening on port 8000')

let express = require('express')
let app = express()

app.get('/', function(req, res){
    res.send("<h1>Hello World (from express)</h1>")
})
app.listen(8000, function(){
    console.log('Server listening to port 8000 using express')
})
