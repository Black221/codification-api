

module.exports = class EtudiantModel {

    constructor({ 
        prenom, 
        nom,
        num_carte, 
        tel, 
        date_naissance, 
        lieu_naissance,
        num_identite,
        nationalite,
        departement,
        option,
        compte,
        niveau, 
        sexe
        }) {
            
            this.prenom = prenom
            this.nom = nom
            this.num_carte = num_carte
            this.tel = tel
            this.date_naissance = date_naissance
            this.lieu_naissance = lieu_naissance 
            this.num_identite = num_identite
            this.nationalite = nationalite
            this.departement = departement
            this.option = option
            this.niveau = niveau
            this.compte =  compte
            this.sexe = sexe
        }

}