const mongoose = require('mongoose')

const { Schema } = mongoose


module.exports = new Schema({
    date: {type: Date, default: Date.now},
    statut: { type:String, enum: ['T', 'S'], default: 'T' },
    compte: { type: Schema.Types.ObjectId, ref:'Compte'},
    chambre: { type: Schema.Types.ObjectId, ref:'Chambre'}
}, { collection: 'reservations' })