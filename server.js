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
let otoro = {
    japaneseName: 'Otoro',
    englishName: 'Fatty Tuna'
}
app.get('/api/otoro',(request,response)=>{
    response.json(otoro)
})
let oleaSpecials = {
    figSalad : {
        category: 'appetizer',
        name:'fig and beets salad',
        description: 'organic fresh California black figs, beets, arugula, crispy tomato skins, goat cheese ice cream, sunflower seed-white balsamic vinaigrette, sunflower crunch',
        price:17,
        allergies:'dairy,seeds'
    },
    boquerones:{
        category:'appetizer',
        name:'boquerones',
        description:'marinated fresh anchovies, avocado-cilantro purée, toast ',
        price:14,
        allergies:'GARLIC, gluten'
    },
    shortRibs:{
        category:'entree',
        name:'boneless beef shortribs',
        description:'grass fed, braised, celery root purée, organic carrots, puffed Dijon mustard gnocchi, Rioja red wine truffle jus',
        price:35,
        allergies:'GARLIC, dairy, gluten'
    },
    sobaito:{
        category:'dessert',
        name:'sobaito',
        description:'white chocolate sponge cake, white chocolate vanilla ganache, mango-ginger compote, kiwi gelatin, chocolate caramel tuile, Thai-basil-black pepper mocktail',
        price:14,
        allergies:'DAIRY'
    },
    unknown:{
        category:'unknown',
        name:'unknown',
        description:'unknown',
        price:0,
        allergies:'unknown'
    }
}
app.get('/api/olea',(request,response)=>{
    response.json(oleaSpecials)
})
app.get('/api/olea-items/:specialItem', (req,res)=>{
    const special = req.params.specialItem
    console.log(special)
    if (oleaSpecials[special]){
        res.json(oleaSpecials[special])
    }else{
        res.json(oleaSpecials['unknown'])
    }
})
app.get('/client-side-olea', (req,res)=>{
    res.sendFile(__dirname + '/client-side-olea/index.html')
})
app.listen(PORT, () => {
    console.log(`Dan's Server is listening on port ${PORT}`);
})
