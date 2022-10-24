const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = new Schema({
    prenom: String,
    nom: String,
    tel: {type: Number, unique: true},
    date_naissance: String,
    lieu_naissance: String,
    num_identite: {type: Number, unique: true},
    nationalite: String,
    departement: String,
    option: String,
    niveau: String,
    num_carte: { type:String, required:true, unique: true },
    email: {type: String, required: true},
    compte: { type: Schema.Types.ObjectId, default: null, ref:'Compte'},
    sexe: { type:String, enum: ['F', 'M'] },
    admin : {
        type: Boolean,
        default: false
    }
},{ collection: 'etudiants' })