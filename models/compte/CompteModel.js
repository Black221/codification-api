

module.exports = class CompteModel {

    constructor({ email, password, inscrit, reserver, codifier }){

        this.email = email
        this.password = password
        this.inscrit = inscrit
        this.reserver = reserver
        this.codifier = codifier
    }
}