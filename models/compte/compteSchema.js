const mongoose = require('mongoose')

const { Schema } = mongoose


module.exports = new Schema({
    email: {type: String},
    password: String,
    inscrit: {type: Boolean, default: false},
    reserver: {type: Boolean,default: false},
    codifier: {type: Boolean, default: false}
},{ collection: 'comptes' })
