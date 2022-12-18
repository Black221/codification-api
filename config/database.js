const mongoose = require("mongoose");


const uri = "mongodb+srv://codifHackUser:xakOxfexNTmPpGVS@codification.06cdi.mongodb.net/db_codif?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MDB'))
        .catch((error) => console.log('Connected error :', error));
