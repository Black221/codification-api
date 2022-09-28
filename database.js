const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const uri = "mongodb+srv://admin:admin@cluster0.kvijj.mongodb.net/cee?retryWrites=true&w=majority"

module.exports = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then( resolve => console.log( "Connexion Base de Donne Etablie" ))
        .catch( err => console.log( err ) )
        
