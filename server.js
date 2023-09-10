const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const saslprep = require('saslprep');
dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
let PORT = process.env.PORT || 3000;
let connectedClient, db;
async function connectToMongoDB(){
    try {
        connectedClient = await client.connect();
        console.log('Dan connected to MongoDB!');
    } catch (error) {
        console.log(error);
    } finally {
        db = connectedClient.db('Olea')
    }
}
connectToMongoDB();
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})
app.post('/addSpecial', (request,response)=>{
    db.collection('Specials').insertOne(request.body)
    .then(result =>{
        console.log('New Special Added')
        response.redirect('/')
    })
    .catch(error => console.log(error))
})
app.delete('/deleteSpecial', (request,response) => {
    db.collection('Specials').deleteOne({name: request.body.specialNameX})
    .then(result => {
        console.log(request.body.specialNameX)
        console.log('Old Special Deleted')
        response.json('Old Special Deleted')
    })
    .catch(error => console.error(error))
})
app.listen(PORT, () => {
    console.log(`Dan's Server is listening on port ${PORT}`);
})
