const mongoose = require('mongoose')
const EtudiantModel = require('./EtudiantModel')
const etudiantSchema = require('./etudiantSchema')


etudiantSchema.loadClass(EtudiantModel)

module.exports = mongoose.model('Etudiant', etudiantSchema)