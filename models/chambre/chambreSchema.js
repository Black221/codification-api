const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    numero: Number,
    nb_place: {type: Number, min: 0},
    pavillon: { type:String, enum:['A', 'B', 'C', 'F', 'G'] },
    sexe: { type:String, enum:['F', 'M'] },
    vue: String,
}, {optimisticConcurrency: true ,collection: 'chambres'})