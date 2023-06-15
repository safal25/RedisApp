const express=require('express');
const redis=require('redis');

const app=express();
const client = redis.createClient({
    url : 'redis://redis-server'
});

client.on('error', err => console.log('Redis Client Error', err));

(async function main(){
    await client.connect();
    await client.set("visits",0);
})();


app.get('/',async (req,res)=>{
    
    let visits=await client.get("visits");
    res.send(`Number of visits : ${visits}`);
    client.set('visits',parseInt(visits)+1);
});

app.listen(8080,(err)=>{
    if(err) console.log(err);
    console.log("Listening to port 8080");
})

