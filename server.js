const http = require('http')
const fs = require('fs')
const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('index.html',(error,data)=>{
        res.write(data)
        res.end()
    })
})

HTTP_PORT = process.env.PORT || 8080;
server.listen(HTTP_PORT, ()=>{
    console.log(`Node Server now listening on port ${HTTP_PORT}`)
})