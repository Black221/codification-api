module.exports = class ReservationModel {

    constructor({ color, nom, prenom, contact, location, title, mail, date, start, end }){
        this.color = color
        this.nom = nom
        this.prenom = prenom
        this.contact = contact
        this.location = location
        this.title = title
        this.mail = mail
        this.date = date
        this.start = start
        this.end = end
    }
}