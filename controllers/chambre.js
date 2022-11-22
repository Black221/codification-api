const Chambre = require('../models/chambre')
const Etudiant = require('../models/etudiant')
const Reservation = require('../models/reservation')

module.exports = class ChambreController{

    async getAllChambres (req, res) {
        try {
            const chambres = await Chambre.find()
            res.json({code: 200, chambres});
        } catch (err) {
            res.json({code: 400, msg: err.message})
        }
    }

    async getChambre(req, res, next){
        /*Afficher les chambres du sexe de l'etudiant disponible*/
        const { num_carte } = req.params
        const { pavillon } = req.body
        try {
            const etudiant = await Etudiant.findOne({num_carte})
            if(etudiant){
                const chambres = await Chambre.find({pavillon, sexe: etudiant.sexe, nb_place: {$gt: 0}}).sort([['numero', 1]])
                return res.json({ code:200, chambres })
            }else{
                return res.json({code:500, msg: "l'etudiant n'est pas présente dans la base de donnée"})
            }
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }
    async getChambreVide(req, res, next){
        /*Afficher les chambres du sexe de l'etudiant disponible*/
        const { num_carte } = req.params
        const { pavillon } = req.body
        let chambres = []
        try {
            const etudiant = await Etudiant.findOne({num_carte})
            if(etudiant){
                if(pavillon === "G"){
                    chambres = await Chambre.find({pavillon, sexe: etudiant.sexe, nb_place: {$eq: 6}}).sort([['numero', 1]])
                }else{
                    chambres = await Chambre.find({pavillon, sexe: etudiant.sexe, nb_place: {$eq: 3}}).sort([['numero', 1]])
                }
                return res.json({ code:200, chambres })
            }else{
                return res.json({code:500, msg: "l'etudiant n'est pas présente dans la base de donnée"})
            }
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }
    async getReserved(req, res){
        /*Afficher les etudiants qui ont réservés dans la chambre*/
        const { idChambre } = req.params
        try {
            const resa = await Reservation.find({ chambre:idChambre })
            const membres = await Promise.all( resa.map(async (res, k) => await Etudiant.findOne({ compte : res.compte})) ) 
            return res.json({code:200, membres })

        } catch (err) {
            return res.json({code:400, msg: err.msg})
        }
    }

    async getPlaces(req, res){
        /*Affiche le nombre de place libre pour tous les pavillons */
        try {
            const pavillon = ["A", "B", "C", "F", "G"]
            const places = await Promise.all(
                pavillon.map(async (pav) => {
                    const chbre_fille = await Chambre.find({ pavillon: pav, sexe: "F", nb_place: {$gt: 0} })
                    const chbre_gar = await Chambre.find({ pavillon: pav, sexe: "M", nb_place: {$gt: 0} })
                    let place_fille = chbre_fille.reduce((prev, suiv) => prev + suiv.nb_place, 0) 
                    let place_garcon = chbre_gar.reduce( (prev, suiv) => prev + suiv.nb_place, 0)
                    return { pav, girl:place_fille, boy:place_garcon }
                }))
            return res.json({code:200, places })
        } catch (err) {
            return res.json({code:400, msg: err.msg})
        }
    }
    async addChambres (req, res) {
        try {
            const chambre = await Chambre.create(
                {
                    ...req.body
                }
            );
            res.json({code: 200, chambre})
        } catch (err) {
            res.json({code: 400, msg: err.msg})
        }
    }
}