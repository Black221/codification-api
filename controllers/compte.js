const Compte = require('../models/compte')
const Etudiant = require('../models/etudiant')
const Resa = require('../models/reservation')
const Chambre = require('../models/chambre')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id}, 'secret token', {expiresIn: maxAge})
}

module.exports = class CompteController {

    async inscription(req, res){
        /*S'incrire pour codifier */
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            const { num_carte:numcarte } = req.params
            // Création du compte
            Etudiant.findOne({ num_carte:numcarte })
                    .exec()
                    .then( async (etudiant) => {
                        const compte = etudiant.compte
                        if(compte)
                            return res.json({ code:200, msg:"Vous êtes déja inscrit" });

                        const newCompte = new Compte({...req.body, inscrit:true })
                        await newCompte.save()
                        await etudiant.update({ $set : { compte:newCompte._id } })
                        const token = createToken(newCompte._id)
                        return res.json({code:200, compte: newCompte , user: {num_carte: req.body.num_carte, token}})
                    })
                    .catch( err =>{
                        console.log(err)
                        return res.json({ code:400, msg:"Cet étudiant n'éxiste pas" })
                    })

        } catch (err) {
            return res.status(500).json({code:500, msg: err.message})
        }
    }

    async connexion(req, res){
        /*Connexion pour la codification */
        try {
            let chambre = null
            const etudiant = await Etudiant.findOne({num_carte: req.body.num_carte})
            if(etudiant){
                const compte = await Compte.findById(etudiant.compte)
                if(compte){
                    if(compte.inscrit === true){
                        if(bcrypt.compareSync(req.body.password, compte.password)){
                            if(compte.reserver === true){
                                const resa = await Resa.findOne({compte: compte._id})
                                chambre = await Chambre.findById(resa.chambre)
                            }
                            const token = createToken(compte._id)
                            return res.json({code:200, etudiant, chambre, codifier: compte.codifier, user: {num_carte: etudiant.num_carte, token}})
                        }
                        else{
                            return res.json({code:500, msg: "mot de passe incorrect"})
                        }
                    }else{
                        return res.json({code:500, msg: "vous n'êtes pas inscrit"})
                    }
                }else{
                    return res.json({code:500, msg: "vous n'êtes pas inscrit"})
                }
            }else{
                return res.json({code:500, msg: "vous n'êtes pas présent dans la base de donnée"}) 
            }
        } catch (err) {
            return res.status(500).json({code:400, msg: err.message})
        }
    }

    async annuler(req, res){
        /*Annuler inscription en cas d'oubli de mot de passe */
        const { numCarte } = req.params
        try {
            const etudiant = await Etudiant.findOne({num_carte: numCarte})
            const idCompte = etudiant.compte
            if(idCompte){
                etudiant.compte = null
                etudiant.save()
                const compte = await Compte.findById(idCompte)
                if(compte.reserver === true){
                    const resa = await Resa.findOne({compte: idCompte})
                    await Chambre.findByIdAndUpdate(resa.chambre, {$inc: { nb_place:1 }})
                    await Resa.findOneAndRemove({compte: idCompte})
                    await Compte.findByIdAndDelete(idCompte)
                    return res.json({code:200, msg: "Inscription annulé avec succés"})
                }else{
                    await Compte.findByIdAndDelete(idCompte)
                    return res.json({code:200, msg: "Inscription annulé avec succés"})
                }
            }else{
                return res.json({ code:500, msg: "l'etudiant n'est pas inscrit" })
            }
        } catch (err) {
            return res.status(500).json({code:400, msg: err.message})
        }
    }

    async getCompte(req, res){
        /*Retourne le compte d'un carte etudiant*/
        const num_carte = req.params.num_carte
        try{
            const etudiant = await Etudiant.findOne({num_carte: num_carte})
            const id = etudiant.compte
            if(id != null){
                const compte = await Compte.findById(id)
                return res.json({ code:200, compte: compte })
            }else{
                return res.json({ code:500, msg: "l'etudiant n'a pas de compte" })
            }
        }catch(err){
            return res.json({ code:500, msg: err.message })
        }
    }
}