const Etudiant = require('../models/etudiant')
const Resa = require('../models/reservation')

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const NIVEAU = {
    '5': 'DIC3',
    '4': 'DIC2',
    '3': 'DIC1',
    '2': 'DUT2',
    '1': 'DUT1',
}

module.exports = class EtudiantController {

    async getEtudiants(req, res){
        /* Avoir la liste des etudiants */
        try {
            const etudiants = await Etudiant.find().populate('compte')
            const finalResult = await Promise.all(etudiants.map(async function(etud){
                let compte = etud.compte
                if(compte != null){
                    const resa = await Resa.findOne({compte: compte}).populate('chambre')
                    console.log(resa)
                    let reservation;
                    let chambre;
                    if(resa){
                        reservation = {...resa._doc}
                        chambre = reservation.chambre.numero+""+reservation.chambre.pavillon
                    }else{
                        // reservation = {reservation: null}
                        chambre = "non codifié"
                    }
                    etud = { nom: etud.nom,
                        prenom: etud.prenom,
                        sexe: etud.sexe,
                        tel: etud.tel,
                        num_carte: etud.num_carte,
                        niveau: NIVEAU[etud.niveau],
                        chambre
                    }
                    return etud
                }else{
                    // let reservation = {reservation: null}
                    etud = {
                        num_carte: etud.num_carte,
                        nom: etud.nom,
                        prenom: etud.prenom,
                        sexe: etud.sexe,
                        tel: etud.tel,
                        niveau: NIVEAU[etud.niveau],
                        chambre: "non codifié"
                    }
                    return etud
                }
            }))
            return res.json( {code:200, etudiant: finalResult} )
        } catch (err) {
            return res.json( {code: 400, msg: err.message} )
        }
    }

    async getEtudiant(req, res){
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
            let reservation;
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
            const data = {...req.body, num_carte, admin: false}
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
