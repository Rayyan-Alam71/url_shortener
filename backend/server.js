const {connectDb , urlModel} = require('./database.js');
connectDb();
const { v4 : uuidv4} = require('uuid');
const express = require('express');
const { generateURL } = require('./shortid.js');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.post('/upload' , async (req , res)=>{
    const originalUrl = req.body.url; // Corrected variable name

    const shortenedUrl = generateURL();
    try{
        const newUrl = new urlModel({
            originalUrl : originalUrl,
            shortUrl : shortenedUrl
        })
        await newUrl.save();
        
        res.json({
            shortenedUrl : shortenedUrl
        })
    }catch(e){
        console.log('some error occurred', e); // Log the actual error
        res.json({
            msg : 'caught in try catch block'
        })
    }
})

app.get('/:shortId', async (req, res)=>{
    const {shortId} = req.params;
    console.log(shortId);

    // const findUrl = await urlModel.findOne({shortUrl : shortId});
    // if(!findUrl){
    //     res.json({
    //         msg : 'such shortened url doesn`t exist'
    //     })
    // }
    // else{
    //     // res.json({
    //     //     msg : `original_url : ${findUrl.originalUrl}`
    //     // })
    //     res.redirect(findUrl.originalUrl)
    // }

// i got the issue , actually when i pass the shortened url as param, it does search for the same in the databse and if found then redirects to the url but in a fashion like 'localhost:3000/originalUrl'  , and then again it goes into another check of /:shortId and takes originalUrl as shortId as new param and then cannot find it inthe db and results if wallah error (means in second access via get method)
    try{
        const url = await urlModel.findOne({
            shortUrl : shortId
        })
        if(url){
            res.redirect(url.originalUrl.startsWith('https:') ? `${url.originalUrl}` :  'https://'+url.originalUrl);
        }else{
            res.json({
                msg: 'url not found'
            })
        }
    }catch(e){
        console.log('some error occured : '+e);
    }
})
app.listen(3000, ()=>{
    console.log('server is running...');
})
