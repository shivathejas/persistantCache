var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var redis = require('redis');
var config = require('./config');
var axios = require('axios');
var logger = require('morgan');

// Creating redis client
var client = redis.createClient(config.redisPort,config.redisHost);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));

client.on('connect', async function() {
    console.log('connected');
});

app.post("/api/get/translation",async (req,res)=>{
    var data = req.body;
    // to get the data from cache
    await client.hgetall(data.message,(err, reply)=>{
        if(err){
            return res.status(500).send({
                message:err
            })
        }
        if(reply !== null){
            for(let value of Object.entries(reply)){
                if(data.targetLanguage === value[0]){
                   res.status(200).send({
                        message:"getting message from cache",
                        requestedMessage:data.message,
                        translation:value[1]
                    })
                }
            }
        }
    });
    // Mock API call to get the translation for few defined messages
    axios.get('https://run.mocky.io/v3/775a3db8-1cd2-4b68-8050-ad658e5041bd').then(async (response)=>{
    var len =response.data.data.length-1;
    for(let i=0;i<len;i++){
            for(let value in response.data.data[i]){
                if(data.message === response.data.data[i][value]){
                    await client.hmset(data.message,response.data.data[i])
                    return res.status(200).json({
                        requestedMessage:data.message,
                        translation: response.data.data[i][data.targetLanguage]
                    })
                }
            }
            // If transaltion is missing for any of the message, we send the below response
            res.status(200).json({
                requestedMessage:data.message,
                translation:response.data.data[len][data.targetLanguage]
            })
        }
    }).catch((err)=>console.log(err));

})


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`listening to port ${PORT}`))