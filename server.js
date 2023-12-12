const express = require('express');
const { MongoClient, Timestamp } = require('mongodb');
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
app.get('/dinnerLayout', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerLayout.ejs', {info: data})
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
app.post('/saveChanges', async (request,response)=>{
    if (request.body.paddingSides != ""){
    await db.collection('Specials').updateOne({_id: new ObjectId("6552683e620b78c09f6ad4ee")},{
        $set:{
            pixels: `${request.body.paddingSides}px`
        }
    })
    }
    if (request.body.paddingTop != ""){
    await db.collection('Specials').updateOne({_id: new ObjectId("654e59526db7f75b37effb75")},{
        $set:{
            pixels: `${request.body.paddingTop}px`
        }
    })
    }
    if (request.body.h1paddingBottom != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("65526e13458b31706ba327c6")},{
                $set:{
                    pixels: `${request.body.h1paddingBottom}px`
                }
        })
    }
    if (request.body.headingsPadding != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("6552745d458b31706ba327c7")},{
                $set:{
                    pixels: `${request.body.headingsPadding}px`
                }
        })
    }
    if (request.body.menuItemsPadding != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("655277f12695fb229cd2f8bb")},{
                $set:{
                    pixels: `${request.body.menuItemsPadding}px`
                }
        })
    }
    if (request.body.lineHeight != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("6552843bc830309949e62da3")},{
                $set:{
                    pixels: `${request.body.lineHeight}px`
                }
        })
    }
    if (request.body.paddingBottom != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("6552b499c5ef1e93714ad81b")},{
                $set:{
                    pixels: `${request.body.paddingBottom}px`
                }
        })
    }
    if (request.body.headingsPaddingBottom != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("65529aad1d34afc4583f9716")},{
                $set:{
                    pixels: `${request.body.headingsPaddingBottom}px`
                }
        })
    }
    if (request.body.legalDisclaimer != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65529cf61d34afc4583f9717")},{
            $set:{
                display: `${request.body.legalDisclaimer}`
            }
        })
    }
    if (request.body.legalDisclaimerFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552da9842bc2235c2d5166a")},{
            $set:{
                pixels: `${request.body.legalDisclaimerFontSize}px`
            }
        })
    }
    if (request.body.todaysSpecialsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552dcebc7561e1a7e641aaf")},{
            $set:{
                pixels: `${request.body.todaysSpecialsFontSize}px`
            }
        })
    }
    if (request.body.headingsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552deb4c7561e1a7e641ab0")},{
            $set:{
                pixels: `${request.body.headingsFontSize}px`
            }
        })
    }
    if (request.body.menuItemsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552e063c7561e1a7e641ab1")},{
            $set:{
                pixels: `${request.body.menuItemsFontSize}px`
            }
        })
    }
    // setTimeout(()=>response.redirect('/'),250)
    response.redirect('/specialsFormatLayout')    
})

app.post('/saveDinnerMenuChanges', async (request,response)=>{
    
    if (request.body.dinnerMenuFontSize != ""){
    await db.collection('Specials').updateOne({_id: new ObjectId("655f8c429408f905f197480a")},{
        $set:{
            pixels: `${request.body.dinnerMenuFontSize}px`
        }
    })
    }
    if (request.body.dinnerMenuLineHeight != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655faeba8c4c6fb6765f2bad")},{
            $set:{
                pixels: `${request.body.dinnerMenuLineHeight}px`
            }
        })
        }
    if (request.body.oleaLogoFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655ea242d37783c929bb3e17")},{
            $set:{
                pixels: `${request.body.oleaLogoFontSize}px`
            }
        })
    }
    if (request.body.legalDisclaimerFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fc5fe8c4c6fb6765f2bb2")},{
            $set:{
                pixels: `${request.body.legalDisclaimerFontSize}px`
            }
        })
    }
    if (request.body.sidesFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fcc818c4c6fb6765f2bb3")},{
            $set:{
                pixels: `${request.body.sidesFontSize}px`
            }
        })
    }
    if (request.body.dinnerPaddingSides != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fdfe58c4c6fb6765f2bb4")},{
            $set:{
                pixels: `${request.body.dinnerPaddingSides}px`
            }
        })
    }
    if (request.body.dinnerPaddingTop != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fe14a8c4c6fb6765f2bb5")},{
            $set:{
                pixels: `${request.body.dinnerPaddingTop}px`
            }
        })
    }
    if (request.body.dinnerCenterGap != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fe9d58c4c6fb6765f2bb6")},{
            $set:{
                pixels: `${request.body.dinnerCenterGap}px`
            }
        })
    }
    if (request.body.dinnerMenuItemsPadding != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fffce8c4c6fb6765f2bb7")},{
            $set:{
                pixels: `${request.body.dinnerMenuItemsPadding}px`
            }
        })
    }
        



    // setTimeout(()=>response.redirect('/dinner'),250)
    response.redirect(request.get('referer'))
})
app.get('/specialsLayout', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('specialsLayout.ejs', {info: data})
    })
})

app.get('/specialsUpdate', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('specialsUpdate.ejs', {info: data})
    })
})
app.get('/dinnerUpdateCuredMeats', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateCuredMeats.ejs', {info: data})
    })
})
app.get('/dinnerUpdateAppetizers', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateAppetizers.ejs', {info: data})
    })
})
app.get('/dinnerUpdateEntrees', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateEntrees.ejs', {info: data})
    })
})
app.get('/dinnerUpdateSides', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateSides.ejs', {info: data})
    })
})
app.get('/archive', (request, response) =>{
    db.collection('Specials').find().sort({timestamp:-1}).toArray()
    .then(data => {
        response.render('archive.ejs', {info: data})
    })
})
app.get('/specialsPrintPreview', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('specialsPrintPreview.ejs', {info: data})
    })
})
app.get('/dinnerPrintPreview', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerPrintPreview.ejs', {info: data})
    })
})

app.post('/addSpecial', async(request,response)=>{
    await db.collection('Specials').insertOne(request.body)
    .then(result =>{
        console.log('New Special Added')
        console.log(request.body)
    })
    await db.collection('Specials').updateOne({
        category: `${request.body.category}`,
        name: `${request.body.name}`,
        description: `${request.body.description}`,
        price: `${request.body.price}`,
        allergies: `${request.body.allergies}`
    },{
        $set:{
            timestamp: new Date()
            
        }
    })
    response.redirect(request.get('referer'))
})

app.delete('/deleteSpecial', async (request,response) => {
    let count = 0;
    await db.collection('Specials').find().toArray()
    .then(data=>{
        data.forEach(element=>{
            if(element.category == request.body.category &&
                element.sequence != "0") count++
        })
    })
                for (let i=Number(request.body.sequence)+1;i<=count;i++){
                    await db.collection('Specials').updateOne({
                        category: `${request.body.category}`,
                        sequence: `${i}`
                    },{
                        $set:{
                            sequence: `${new String(i-1)}`
                        }
                    })                
                }
               
            
        
    db.collection('Specials').deleteOne({_id: new ObjectId(request.body._id)})
    .then(result => {
        console.log('Special Deleted')
        response.json('Special Deleted')
    })
})
app.delete('/deleteArchive', async(req, res)=>{
    // console.log(req.body);
    await db.collection('Specials').deleteOne({_id: new ObjectId(req.body._id)})
    .then(result=>{
        console.log('Archive Deleted')
        res.json('Archive Deleted')
    })
})
app.post('/archiveSpecial', async (request,response)=>{
    console.log('archive()');
    let totalCount = 0;
    await db.collection('Specials').find().toArray()
    .then(data =>{
        data.forEach(element => { 
            if (element.category == request.body.category &&
                element.sequence != "0") totalCount++
            
        });
    })
    // if (request.body.category == "SPECIALS: Appetizer"){totalCount=request.body.appetizerCount}
    // if (request.body.category == "SPECIALS: Entrée"){totalCount=request.body.entreeCount}
    // if (request.body.category == "SPECIALS: Dessert"){totalCount=request.body.dessertCount}

    for (let i=Number(request.body.sequence)+1;i<=totalCount;i++){
        await db.collection('Specials').updateOne({
            category: `${request.body.category}`,
            sequence: `${i}`
        },{
            $set:{
                sequence: `${new String(i-1)}`
            }
        })
    }
    await db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            sequence: "0",
            timestamp: new Date()
        }
    })
    .then(result => {
        console.log('Special Archived')
        // setTimeout(()=>{response.json('Special Archived')},250)
        response.json('Special Archived')
    })
})

app.post('/unarchiveSpecial', async (request,response)=>{
    let count=0;
    await db.collection('Specials').find().toArray()
    .then(data=>{
        data.forEach(element=>{
            if (element.category == request.body.category &&
                element.sequence &&
                element.sequence != "0") count++
        })
    })
    // console.log(request);
    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            sequence: `${count+1}`,
            timestamp: new Date()
        }
    })
    .then(result => {
        console.log('Special UNarchived/Restored')
        response.json('Special UNarchived/Restored')
    })
})

app.post('/editSpecial', (request, response) => {
    console.log(request);
    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            category: request.body.category,
            sequence: request.body.sequence,
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            allergies: request.body.allergies,
            timestamp: new Date()
        }
    })
    .then(result =>{
        console.log('Existing Special Modified')
        response.redirect(request.get('referer'))
    })
})
app.get('/manager', (req,res)=>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        res.render('manager.ejs', {info: data})
    })
})
app.get('/specialsFormatLayout', (req,res)=>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data=>{
        res.render('specialsFormatLayout.ejs', {info: data})
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

