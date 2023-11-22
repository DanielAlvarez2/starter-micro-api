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
    console.log(request.body);
    console.log(request.body.paddingTop);


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
    
    db.collection('Specials').updateOne({_id: new ObjectId("65529cf61d34afc4583f9717")},{
        $set:{
            display: `${request.body.legalDisclaimer}`
        }
    })

    db.collection('Specials').updateOne({_id: new ObjectId("6552da9842bc2235c2d5166a")},{
        $set:{
            pixels: `${request.body.legalDisclaimerFontSize}px`
        }
    })

    db.collection('Specials').updateOne({_id: new ObjectId("6552dcebc7561e1a7e641aaf")},{
        $set:{
            pixels: `${request.body.todaysSpecialsFontSize}px`
        }
    })

    db.collection('Specials').updateOne({_id: new ObjectId("6552deb4c7561e1a7e641ab0")},{
        $set:{
            pixels: `${request.body.headingsFontSize}px`
        }
    })

    db.collection('Specials').updateOne({_id: new ObjectId("6552e063c7561e1a7e641ab1")},{
        $set:{
            pixels: `${request.body.menuItemsFontSize}px`
        }
    })

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
app.get('/print', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('print.ejs', {info: data})
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
                    console.log("i = "+i)
                    console.log("request.body.category = " + request.body.category)
                    console.log("i = "+i)
            
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
               
            }
        }
        if (request.body.category == "SPECIALS: Entrée"){
            if (!(request.body.sequence == "1" && request.body.entreeCount == "1")){

            }
        }
        if (request.body.category == "SPECIALS: Dessert"){
            if (!(request.body.sequence == "1" && request.body.dessertCount == "1")){
                console.log('NOT solo entry')
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
    console.log("totalCount: "+totalCount);

    for (let i=Number(request.body.sequence)+1;i<=totalCount;i++){
        console.log("i = "+i)
        console.log("request.body.category = " + request.body.category)
        console.log("i = "+i)

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
    console.log("request.body.sequence: " + request.body.sequence);
    console.log("request.body.appetizerCount: " + request.body.appetizerCount);
    console.log("request.body.entreeCount: " + request.body.entreeCount);
    console.log("request.body.dessertCount: " + request.body.dessertCount);

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

