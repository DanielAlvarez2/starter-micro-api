// daniel.cyclic.app

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const PORT = process.env.PORT || 8000

let sushi = {
    'umeiro':{
        'japaneseName' : 'Umeiro',
        'englishName': 'Yellowtail Blue Snapper'    
    },
    'isaki':{
        'japaneseName': 'Isaki',
        'englishName': 'Grunt Fish'
    },
    'shima aji':{
        'japaneseName': 'Shima Aji',
        'englishName': 'Striped Jack Mackerel'
    },
    'saba':{
        'japaneseName': 'Saba',
        'englishName': 'Mackerel'
    },
    'aji':{
        'japaneseName': 'Aji',
        'englishName': 'Horse Mackerel'
    },
    'tachi uo':{
        'japaneseName':'Tachi Uo',
        'englishName': 'Belt Fish'
    },
    'unknown':{
        'japaneseName':'unknown',
        'englishName':'unknown'
    }
    
}

app.get('/',(request,response)=>{
    response.sendFile(__dirname + '/client-side-sushi/index.html')    
})

app.get('/api/sushi/:sushiName',(request,response)=>{
    const sushiRequest = request.params.sushiName.toLowerCase()
    console.log(sushiRequest);
    if (sushi[sushiRequest]){
        response.json(sushi[sushiRequest])
    }else{
        response.json(sushi['unknown'])
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})




// SIMPLE SERVER WORKING ON CYCLIC daniel.cyclic.app
// let http = require('http');
// let x = 'working from server.js';
// http.createServer(function (req, res) {
//     console.log(`Just got a request at ${req.url}!`)
//     res.write(x);
//     res.end();
// }).listen(process.env.PORT || 3000);
