require('dotenv').config({path : './config/.env'})
const express = require('express')
const cors = require('cors')

/* Routers */
const etudiantRouter = require('./routes/etudiant')
const compteRouter = require('./routes/compte')
const resaRouter = require('./routes/reservation')
const chambreRouter = require('./routes/chambre')
const adminRouter = require('./routes/admin')
const reserverRouter = require('./routes/reserverTerrain')

/* Middlewares */
const errorHandler = require('./middlewares/errorHandler')
const Controller = require("./controllers/chambre");
const mongoose = require("mongoose");


const app = express()

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    console.log("Serveur démarrer avec succes")
    res.send("Bienvenue trés cher vous n'avez rien à faire ici, allez sur: www.espolytech.com")
})

app.use(cors())
// const controller = new Controller()

app.use('/etudiant', etudiantRouter)
app.use('/compte', compteRouter)
app.use('/reservation', resaRouter)
app.use('/chambre', chambreRouter)
app.use('/admin', adminRouter)
app.use('/reserverTerrain', reserverRouter)

app.delete('/delete/collection', async (req, res) => {

    if (req.body.collection)
        try {
            await mongoose.connection.db.dropCollection(req.body.collection)
            return res.json({code: 200, msg: "delete successfully"})
        } catch (err) {
            return res.json({code: 500, msg: err.message})
        }

    return res.json({code: 404, msg: "no resource found"})
})

app.use( errorHandler )

module.exports = app
