const Resa = require('../models/reservation')
const Chambre = require('../models/chambre')
const Compte = require('../models/compte')
const Etudiant = require('../models/etudiant')

module.exports = class ResaController {
    async reserver(req, res){
        /*Valider reservation chambre */
        const { num_carte } = req.body
        try {
            const etudiant = await Etudiant.findOne({num_carte})
            const compte = await Compte.findById(etudiant.compte)
            if(compte.reserver === false){
                const id = req.params.id
                const chambre = await Chambre.findById(id)
                if(chambre.nb_place > 0){
                    if(chambre.nb_place === 1 && chambre.pavillon !== "G"){
                        Chambre.updateOne({_id:id}, {$inc: { nb_place:-1 }})
                           .exec()
                           .then( async () => {
                                const newResa = await Resa({statut: 'S', compte: compte._id, chambre: chambre._id})
                                await newResa.save()
                                await Compte.findByIdAndUpdate(etudiant.compte, {reserver: true})
                                return res.json({code:200, chambre}) 
                           })
                           .catch( err => console.log(err))
                    }else{
                        Chambre.updateOne({_id:id}, {$inc: { nb_place:-1 }})
                           .exec()
                           .then( async () => {
                                const newResa = await Resa({compte: compte._id, chambre: chambre._id})
                                await newResa.save()
                                await Compte.findByIdAndUpdate(etudiant.compte, {reserver: true})
                                return res.json({code:200, chambre}) 
                           })
                           .catch( err => console.log(err))
                    }
                }else{
                    return res.json({code:500, msg: "cette chambre est pleine"})
                }
            }else{
                return res.json({code:500, msg: "vous avez déja réservé"})
            }
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }

    async valider(req, res){
        /*Valider codification */
        const { numCarte } = req.params
        try {
            const etudiant = await Etudiant.findOne({num_carte: numCarte})
            const compte = await Compte.findById(etudiant.compte)
            if(compte != null){
                if(compte.reserver === true){
                    if(compte.codifier === false){
                        await Compte.findByIdAndUpdate(etudiant.compte, {codifier: true})
                        return res.json({code:200, msg: "Codification validé avec succés"})
                    }else{
                        return res.json({code:500, msg: "vous avez déjà codifié"})
                    }
                }else{
                    return res.json({code:500, msg: "vous n'avez pas encore réservé"})
                }
            }else{
                return res.json({code:500, msg: "vous n'êtes pas encore inscrit"})
            }
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }

    async annuler(req, res){
        /*Annuler reservation chambre */
        const { numCarte } = req.params
        try {
            const etudiant = await Etudiant.findOne({num_carte: numCarte})
            const idCompte = etudiant.compte
            const compte = await Compte.findById(idCompte)
            if (compte.codifier)
                return res.json({code:500, msg: "Vous avez déjà codifié"})

            if(compte.reserver){
                const resa = await Resa.findOne({compte: idCompte})
                await Chambre.findByIdAndUpdate(resa.chambre, {$inc: { nb_place:1 }})
                await Resa.findOneAndRemove({compte: idCompte})
                await Compte.findByIdAndUpdate(idCompte, {reserver: false})
                await Compte.findByIdAndUpdate(idCompte, {codifier: false})
                return res.json({code:200, msg: "Reservation annulé avec succés"})
            }else{
                return res.json({code:500, msg: "Vous n'avez pas encore reservé"})
            }
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }
}