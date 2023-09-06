const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const saslprep = require('saslprep');
dotenv.config();
const app = express();
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
        db = connectedClient.db('Nama')
    }
}
connectToMongoDB();
app.get('/nama', async (req, res) =>{
    try {
        let collection = await db.collection('sushi');
        let namaSushiList = await collection.find().toArray();
        res.status(200).json(namaSushiList);
    } catch (error) {
        res.status(500).json({error: "Database could not be returned."})
    }
})
app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html')
})
app.listen(PORT, () => {
    console.log(`Dan's Server is listening on port ${PORT}`);
})
