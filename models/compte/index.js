const mongoose = require('mongoose')
const CompteModel = require('./CompteModel')
const compteSchema = require('./compteSchema')


compteSchema.loadClass(CompteModel)

module.exports = mongoose.model('Compte', compteSchema)