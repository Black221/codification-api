const mongoose = require('mongoose')
const reserverModel = require('./reserverModel')
const reserverSchema = require('./reserverSchema')


reserverSchema.loadClass(reserverModel)


module.exports = mongoose.model('ReserverTerrain', reserverSchema)