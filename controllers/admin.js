const jwt = require('jsonwebtoken')


const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id}, 'admin token', {expiresIn: maxAge})
}

module.exports = class CompteController {

    async connexion(req, res){
        /*Connexion pour la codification */
        try {
            const { num_carte, password } = req.body
            if(num_carte == "admin"){
                if(password == "admin123"){
                    const token = createToken("usermklebest")
                    return res.json({code:200, token})
                }else{
                    return res.json({code:500, msg: "mot de passe incorrect"})
                }
            }else{
                return res.json({code:500, msg: "nom d'utilisateur incorrect"})
            }
        } catch (err) {
            return res.status(500).json({code:400, msg: err.message})
        }
    }
}