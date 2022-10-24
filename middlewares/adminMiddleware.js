const jwt = require('jsonwebtoken');
const {endOfLine} = require("nodemailer/.prettierrc");

module.exports.requireAdmin = (req, res, next) => {

    try {
        const admin = Etudiant.find({num_carte: req.params.num_carte});
        if (admin && admin.admin) {
            next();
        } else {
            res.json({code: 400, msg: "permission deny"});
        }
    } catch (err) {
        res.json({code: 500, msg: err.message});
    }
};

module.exports.RequireAdminToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization

    // check json web token exists & is verified
    if (tokenHeader) {
        const tokenSplit = tokenHeader.split(' ')
        const token = tokenSplit[1]
        jwt.verify(token, 'admin token', (err, decodedToken) => {
            if (err) {
                return res.json({code:500, msg: err.message})
            } else {
                // console.log(decodedToken);
                next();
            }
        });
    } else {
        return res.json({code:500, msg: "vous n'êtes pas connecté"})
    }
}