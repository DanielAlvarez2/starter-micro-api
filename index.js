let http = require('http');
let x = 'cloned from github';
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write(x);
    res.end();
}).listen(process.env.PORT || 3000);
