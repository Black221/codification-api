const Etudiant = require('../models/etudiant')
const Resa = require('../models/reservation')

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = class EtudiantController {

    async getEtudiants(req, res){
        /* Avoir la liste des etudiants */
        try {
            const etudiants = await Etudiant.find().populate('compte')
            const finalResult = await Promise.all(etudiants.map(async function(etud){
                var compte = etud.compte
                if(compte != null){
                    const resa = await Resa.findOne({compte: compte}).populate('chambre')
                    var reservation = null
                    if(resa){
                        reservation = {reservation: resa._doc}
                    }else{
                        reservation = {reservation: null}
                    }
                    etud = {...etud._doc, ...reservation}
                    return etud
                }else{
                    var reservation = {reservation: null}
                    etud = {...etud._doc, ...reservation}
                    return etud
                }
            }))
            return res.json( {code:200, etudiant: finalResult} )
        } catch (err) {
            return res.json( {code: 400, msg: err.message} )
        }
    }

    getEtudiant(req, res){
        /* identifier un etudiant par son id*/
        const { id } = req.params
        return Etudiant.findById( id ).exec().then( etudiant => {

            return res.json( {code:200, etudiant} )
        }).catch( err => res.json( {code: 400, msg: err.msg} ) )
    }

    async getEtudiantByCarte(req, res){
        /* identifier un etudiant par son numero de carte */
        const { carte } = req.params
        try {
            const etudiant = await Etudiant.findOne({num_carte: carte})
            const compte = etudiant.compte
            const resa = await Resa.findOne({compte: compte}).populate('chambre')
            var reservation = null
            if(resa){
                reservation = {reservation: resa._doc}
            }else{
                reservation = {reservation: null}
            }
            const finalResult = {...etudiant._doc, ...reservation}
            return res.json( {code:200, etudiant: finalResult} )
        } catch (err) {
            return res.json( {code: 400, msg: err.message} );
        }
    }

    async createEtudiantRandom(req, res){
        /* creer un etudiant */
        try {
            /* A random num_carte for a new student */
            const num_carte = "20211A" + getRandomArbitrary(100,1000)
            const data = {...req.body, num_carte}
            const tel = await Etudiant.findOne({tel: req.body.tel})
            const num_identite = await Etudiant.findOne({num_identite: req.body.num_identite})
            if(tel){
                return res.json( {code: 500, msg: "ce telephone existe déjà"} )
            }else{
                if(num_identite){
                    return res.json( {code: 500, msg: "ce CNI existe déjà"} )
                }else{
                    const etudiant = await Etudiant.create(data)
                    return res.json( { code:200, etudiant } )
                }
            }
        } catch (err) {
            return res.json( {code: 400, msg: err.message} )
        }
    }

    async createEtudiant(req, res){
        /* creer un etudiant */
        try {
            const data = {...req.body}
            const tel = await Etudiant.findOne({tel: req.body.tel})
            const num_identite = await Etudiant.findOne({num_identite: req.body.num_identite})
            const num_carte = await Etudiant.findOne({num_carte: req.body.num_carte})
            if(tel){
                return res.json( {code: 500, msg: "ce telephone existe déjà"} )
            }else{
                if(num_identite){
                    return res.json( {code: 500, msg: "ce CNI existe déjà"} )
                }else{
                    if(num_carte){
                        return res.json( {code: 500, msg: "ce numéro de carte existe déjà"} )
                    }else{
                        const etudiant = await Etudiant.create(data)
                        return res.json( { code:200, etudiant } )
                    }
                }
            }
        } catch (err) {
            return res.json( {code: 400, msg: err.message} )
        }
    }
} 