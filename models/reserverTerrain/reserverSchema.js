const mongoose = require('mongoose')

const { Schema } = mongoose


module.exports = new Schema({
    color: {type: String, unique: false},
    nom: {type: String, unique: false},
    prenom: {type: String, unique: false},
    contact: {type: Number, unique: false},
    location: {type: String, unique: false},
    title: {type: String, unique: false},
    mail: {type: String, unique: false},
    date: {type: String, unique: false},
    start: {type: Date, default: Date.now, unique: false},
    end: {type: Date, unique: false}
}, {optimisticConcurrency: true, collection: 'reserverTerrain' })