const app = require('./app')
const db = require('./database')

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Le serveur écoute sur le port ${PORT}`)
})
