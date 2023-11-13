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
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})
app.post('/saveChanges', (request,response)=>{
    console.log(request.body);
    console.log(request.body.paddingTop);

    db.collection('Specials').updateOne({_id: new ObjectId("65526e13458b31706ba327c6")},{
        $set:{
            pixels: `${request.body.h1paddingBottom}px`

        }
    })
    db.collection('Specials').updateOne({_id: new ObjectId("6552683e620b78c09f6ad4ee")},{
        $set:{
            pixels: `${request.body.paddingSides}px`

        }
    })
    db.collection('Specials').updateOne({_id: new ObjectId("654e59526db7f75b37effb75")},{
        $set:{
            pixels: `${request.body.paddingTop}px`

        }
    })
    .then(result=>{
        console.log('Changes Have Been Saved')
        response.redirect('/')
    })
})
app.get('/edit', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('edit.ejs', {info: data})
    })
    .catch(error => console.error(error))
})
app.get('/print', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('print.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/addSpecial', (request,response)=>{
    db.collection('Specials').insertOne(request.body)
    .then(result =>{
        console.log('New Special Added')
        response.redirect('/edit')
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
            sequence: request.body.sequence,
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            allergies: request.body.allergies
        }
    })
    .then(result =>{
        console.log('Existing Special Modified')
        response.redirect('/edit')
    })
})

