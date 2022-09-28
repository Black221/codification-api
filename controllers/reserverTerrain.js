const ReserverTerrain = require('../models/reserverTerrain')
const Etudiant = require('../models/etudiant')
const transport = require('../mail/email')

module.exports = class ResaController {
    async reserver(req, res){
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }
        /*Valider reservation chambre */
        const { numCarte } = req.params
        try {
            let message = {
                from: "cee@esp.sn",
                to: req.body.mail,
                subject: req.body.location,
                text: "Votre réservation a été effectuée avec succés !"
            }
            const user = await Etudiant.findOne({num_carte: numCarte})
            if(!user){
                return res.json({code:400, msg: "Vous n'êtes pas présents dans la base de données."})
            }else{
                const dateDebut = new Date(req.body.start);
                const dateEnd = req.body.end ? req.body.end : new Date(dateDebut).addHours(1);
                const date = dateDebut.getFullYear()+"-"+(dateDebut.getMonth() + 1)+"-"+dateDebut.getDate();
                const dejaReserv = await ReserverTerrain.find({date: date, start: dateDebut})
                if(dejaReserv.length != 0){
                    return res.json({code:400, msg: "Cette heure a été déja prise !"})
                }else{
                    const memeReserv = await ReserverTerrain.find({date: date, contact: req.body.contact})
                    if(memeReserv.length != 0){
                        return res.json({code:400, msg: "Vous avez déjà reservé pour cette journée !"})
                    }else{
                        transport.sendMail(message, async function(err, info) {
                            if (err) {
                                return res.json({code:400, msg: err})
                            } else {
                                req.body.date = date
                                req.body.start = dateDebut
                                req.body.end = dateEnd;
                                const reserv = await ReserverTerrain.create(req.body)
                                return res.json({code:500, msg: {reserv} })
                            }
                        })
                    }
                }
            }
        } catch (err) {
            return res.json({code:400, msg: err})
        }
    }
    async getAll(req, res){
        try {
            const data = await ReserverTerrain.find()
            return res.json({code:500, reservations: data })
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }
    async annuler(req, res){
        try {
            let message = {
                from: "cee@esp.sn",
                to: req.body.mail,
                subject: req.body.location,
                text: "Votre réservation a été anuulée avec succés !"
            }
            if(req.body._id){
                transport.sendMail(message, async function(err, info) {
                    if (err) {
                        return res.json({code:400, msg: err})
                    } else {
                        await ReserverTerrain.deleteOne({_id: req.body._id})
                        return res.json({code: 500, msg: "reservation annulée avec succés !"})
                    }
                })
            }else
                return res.json({code: 400, msg: "Selectionner une reservation"})
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }
    async delete(req, res){
        try {
            let message = {
                from: "cee@esp.sn",
                to: req.body.mail,
                subject: req.body.location,
                text: "Votre réservation a été supprimée !"
            }
            if(req.body._id){
                transport.sendMail(message, async function(err, info) {
                    if (err) {
                        return res.json({code:400, msg: err})
                    } else {
                        await ReserverTerrain.deleteOne({_id: req.body._id})
                        return res.json({code: 500, msg: "reservation supprimée ! "})
                    }
                })
            }else
                return res.json({code: 400, msg: "Selectionner une reservation"})
        } catch (err) {
            return res.json({code:400, msg: err.message})
        }
    }
}