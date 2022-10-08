const jwt = require('jsonwebtoken');
const {endOfLine} = require("nodemailer/.prettierrc");

module.exports = requireAdmin = (req, res, next) => {

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