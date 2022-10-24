const jwt = require('jsonwebtoken')
const Etudiant = require('../models/etudiant')


const maxAge = 7 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id}, 'admin token', {expiresIn: maxAge})
}

module.exports = class CompteController {

    async createAdmin (req, res) {
        const {num_carte} = req.params;

        try {
            const etu = await Etudiant.findOne({num_carte});
            if (!etu.admin) {
                if (etu) {
                    etu.admin = true;
                    etu.save()
                    return res.json({code: 200, msg: "Admin ajouter"});
                }
            } else
                return res.json({code: 200, msg: "Est deja admin"})
            return res.json({code: 400, msg: "Ajout impossible"});
        } catch (err) {
            res.json({code: 500, msg: err.message})
        }
    }

    async connexion(req, res){
        /*Connexion pour la codification */
        try {
            const { num_carte, password } = req.body
            if(num_carte === "admin2022"){
                if(password === "admin@123"){
                    const token = createToken("lhacksrt")
                    return res.json({code:200, etudiant: null, chambre: null, codifier: null, user: {num_carte, admin: true, token}})

                }else{
                    return res.json({code:500, msg: "numero de carte ou mot de passe incorrect"})
                }
            }else{
                return res.json({code:500, msg: "numero de carte ou mot de passe incorrect"})
            }
        } catch (err) {
            return res.status(500).json({code:400, msg: err.message})
        }
    }
}