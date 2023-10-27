const express = require('express');
const { MongoClient } = require('mongodb');
const {ObjectId} = require('mongodb');
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
        db = connectedClient.db('Olea');
        app.listen(PORT, () => {
            console.log(`Dan's Server is listening on port ${PORT}`);
        })        
    }
}
connectToMongoDB();
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (request, response) =>{
    db.collection('Specials: Appetizers').find().toArray()
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
    db.collection('Specials').deleteOne({_id: new ObjectId(request.body._id)})
    .then(result => {
        console.log('Old Special Deleted')
        response.json('Old Special Deleted')
    })
    .catch(error => console.error(error))
})
app.post('/editSpecial', (request, response) => {
    console.log(request.body);
    console.log(`ObjectId('${request.body._id}')`);
    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            category: request.body.category,
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            allergies: request.body.allergies
        }
    })
    .then(result =>{
        console.log('Existing Special Modified')
        response.redirect('/')
    })
})

