const mongoose = require('mongoose')

const ChambreModel = require('./ChambreModel')
const chambreSchema = require('./chambreSchema')


chambreSchema.loadClass(ChambreModel)

module.exports = mongoose.model('Chambre', chambreSchema)


