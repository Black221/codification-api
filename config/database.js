const mongoose = require("mongoose");


const uri = "mongodb+srv://codifHackUser:"+process.env.DB_PASS+"@codification.06cdi.mongodb.net/"+process.env.DB_NAME;


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MDB'))
        .catch(error => () => console.log('Connected error :', error));

