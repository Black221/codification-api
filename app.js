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
const requireAuth = require('./middlewares/authMiddleware')


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

app.use(cors(corsOptions))

app.use('/etudiant/', etudiantRouter)
app.use('/compte', compteRouter)
app.use('/reservation', resaRouter)
app.use('/chambre', requireAuth, chambreRouter)
app.use('/admin', adminRouter)
app.use('/reserverTerrain', reserverRouter)

app.use( errorHandler )

module.exports = app
