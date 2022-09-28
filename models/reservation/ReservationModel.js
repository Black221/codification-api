

module.exports = class ReservationModel {

    constructor({ date, statut, compte, chambre }){

        this.date = date
        this.statut = statut
        this.compte = compte 
        this.chambre = chambre
    }
}