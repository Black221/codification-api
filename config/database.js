const mongoose = require("mongoose");


const uri = "mongodb+srv://codifHackUser:"+process.env.DB_PASS+"@codification.06cdi.mongodb.net/"+process.env.DB_NAME;



const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  if (!err)
    console.log("db working");
});
