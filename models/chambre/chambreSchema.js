const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    numero: Number,
    nb_place: {type: Number, min: 0},
    pavillon: { type:String, enum:['A', 'B', 'C', 'F', 'G'] },
    etage: {type: String, enum: ['R', '1', '2','3','4']},
    sexe: { type:String, enum:['F', 'M'] },
    vue: String,
}, {optimisticConcurrency: true ,collection: 'chambres'})