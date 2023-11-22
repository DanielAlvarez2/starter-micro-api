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

app.get('/checklist', (request,response)=>{
    response.render('checklist.ejs')
})


app.get('/', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
})
app.get('/debug', (request, response) =>{
    db.collection('Specials').find({
        category: "SPECIALS: Appetizer",
        sequence: "3"
    })
        .toArray()
    .then(data => {
        response.render('debug.ejs', {info: data})
    })
})
app.post('/saveChanges', (request,response)=>{
  

    if (request.body.paddingSides != ""){
    db.collection('Specials').updateOne({_id: new ObjectId("6552683e620b78c09f6ad4ee")},{
        $set:{
            pixels: `${request.body.paddingSides}px`
        }
    })
    }

    if (request.body.paddingTop != ""){
    db.collection('Specials').updateOne({_id: new ObjectId("654e59526db7f75b37effb75")},{
        $set:{
            pixels: `${request.body.paddingTop}px`
        }
    })
    }

    if (request.body.h1paddingBottom != "") {
        db.collection('Specials').updateOne({_id: new ObjectId("65526e13458b31706ba327c6")},{
                $set:{
                    pixels: `${request.body.h1paddingBottom}px`
                }
        })
    }

    if (request.body.headingsPadding != "") {
        db.collection('Specials').updateOne({_id: new ObjectId("6552745d458b31706ba327c7")},{
                $set:{
                    pixels: `${request.body.headingsPadding}px`
                }
        })
    }

    if (request.body.menuItemsPadding != "") {
        db.collection('Specials').updateOne({_id: new ObjectId("655277f12695fb229cd2f8bb")},{
                $set:{
                    pixels: `${request.body.menuItemsPadding}px`
                }
        })
    }

    if (request.body.lineHeight != "") {
        db.collection('Specials').updateOne({_id: new ObjectId("6552843bc830309949e62da3")},{
                $set:{
                    pixels: `${request.body.lineHeight}px`
                }
        })
    }

    if (request.body.paddingBottom != "") {
        db.collection('Specials').updateOne({_id: new ObjectId("6552b499c5ef1e93714ad81b")},{
                $set:{
                    pixels: `${request.body.paddingBottom}px`
                }
        })
    }

    if (request.body.headingsPaddingBottom != "") {
        db.collection('Specials').updateOne({_id: new ObjectId("65529aad1d34afc4583f9716")},{
                $set:{
                    pixels: `${request.body.headingsPaddingBottom}px`
                }
        })
    }
    if (request.body.legalDisclaimer != ""){
        db.collection('Specials').updateOne({_id: new ObjectId("65529cf61d34afc4583f9717")},{
            $set:{
                display: `${request.body.legalDisclaimer}`
            }
        })
    }

    if (request.body.legalDisclaimerFontSize != ""){
        db.collection('Specials').updateOne({_id: new ObjectId("6552da9842bc2235c2d5166a")},{
            $set:{
                pixels: `${request.body.legalDisclaimerFontSize}px`
            }
        })
    }

    if (request.body.todaysSpecialsFontSize != ""){
        db.collection('Specials').updateOne({_id: new ObjectId("6552dcebc7561e1a7e641aaf")},{
            $set:{
                pixels: `${request.body.todaysSpecialsFontSize}px`
            }
        })
    }

    if (request.body.headingsFontSize != ""){
        db.collection('Specials').updateOne({_id: new ObjectId("6552deb4c7561e1a7e641ab0")},{
            $set:{
                pixels: `${request.body.headingsFontSize}px`
            }
        })
    }

    if (request.body.menuItemsFontSize != ""){
        db.collection('Specials').updateOne({_id: new ObjectId("6552e063c7561e1a7e641ab1")},{
            $set:{
                pixels: `${request.body.menuItemsFontSize}px`
            }
        })
    }
    setTimeout(()=>response.redirect('/'),250)
    
    
})
app.get('/edit', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('edit.ejs', {info: data})
    })
})
app.get('/archive', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('archive.ejs', {info: data})
    })
})
app.get('/printSpecials', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('printSpecials.ejs', {info: data})
    })
})

app.post('/addSpecial', (request,response)=>{
    db.collection('Specials').insertOne(request.body)
    .then(result =>{
        console.log('New Special Added')
        response.redirect('/edit')
    })
})
app.delete('/deleteSpecial', (request,response) => {
    if (request.body.sequence != "0"){
        if (request.body.category == "SPECIALS: Appetizer"){
            if (!(request.body.sequence == "1" && request.body.appetizerCount == "1")){
                for (let i=Number(request.body.sequence)+1;i<=request.body.appetizerCount;i++){
                    db.collection('Specials').updateOne({
                        category: `${request.body.category}`,
                        sequence: `${i}`
                    },{
                        $set:{
                            sequence: `${new String(i-1)}`
                        }
                    })                
                }
               
            }
        }
        if (request.body.category == "SPECIALS: Entrée"){
            if (!(request.body.sequence == "1" && request.body.entreeCount == "1")){
                for (let i=Number(request.body.sequence)+1;i<=request.body.entreeCount;i++){
                    db.collection('Specials').updateOne({
                        category: `${request.body.category}`,
                        sequence: `${i}`
                    },{
                        $set:{
                            sequence: `${new String(i-1)}`
                        }
                    })                
                }
            }
        }
        if (request.body.category == "SPECIALS: Dessert"){
            if (!(request.body.sequence == "1" && request.body.dessertCount == "1")){
                for (let i=Number(request.body.sequence)+1;i<=request.body.dessertCount;i++){
                    db.collection('Specials').updateOne({
                        category: `${request.body.category}`,
                        sequence: `${i}`
                    },{
                        $set:{
                            sequence: `${new String(i-1)}`
                        }
                    })                
                }
            }
        }
    }
    db.collection('Specials').deleteOne({_id: new ObjectId(request.body._id)})
    .then(result => {
        console.log('Special Deleted')
        response.json('Special Deleted')
    })
})

app.post('/archiveSpecial', (request,response)=>{
    let totalCount;
    if (request.body.category == "SPECIALS: Appetizer"){totalCount=request.body.appetizerCount}
    if (request.body.category == "SPECIALS: Entrée"){totalCount=request.body.entreeCount}
    if (request.body.category == "SPECIALS: Dessert"){totalCount=request.body.dessertCount}

    for (let i=Number(request.body.sequence)+1;i<=totalCount;i++){
        db.collection('Specials').updateOne({
            category: `${request.body.category}`,
            sequence: `${i}`
        },{
            $set:{
                sequence: `${new String(i-1)}`
            }
        })
        .then(result=>{
            console.log('looping...')
        })
    

    }
    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            sequence: "0"
        }
    })
    .then(result => {
        console.log('Special Archived')
        setTimeout(()=>{
            response.json('Special Archived')
        },250)
    })
})

app.post('/unarchiveSpecial', (request,response)=>{
    console.log('unarchiveSpecial()');
    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            sequence: request.body.sequence
        }
    })
    .then(result => {
        console.log('Special UNarchived/Restored')
        response.json('Special UNarchived/Restored')
    })
})

app.post('/editSpecial', (request, response) => {
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

app.post('/moveUp', (request,response)=>{
    
    db.collection('Specials').updateOne({
        category: request.body.category,
        sequence: `${request.body.sequence-1}`
    },
    {
        $set:{
            sequence: `${request.body.sequence}`
        }})

    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},
    {
        $set:{
            sequence: `${request.body.sequence - 1}`
        }
    })

        
    .then(result =>{
        console.log('Special Moved Up')
        response.json('Special Moved Up')
    })
})

app.post('/moveDown', (request,response)=>{
    
    db.collection('Specials').updateOne({
        category: request.body.category,
        sequence: `${Number(request.body.sequence) + 1}`
    },
    {
        $set:{
            sequence: `${request.body.sequence}`
        }})

    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},
    {
        $set:{
            sequence: `${Number(request.body.sequence) + 1}`
        }
    })

        
    .then(result =>{
        console.log('Special Moved Down')
        response.json('Special Moved Down')
    })
})

