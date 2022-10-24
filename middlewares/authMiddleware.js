const jwt = require('jsonwebtoken');

module.exports = requireAuth = (req, res, next) => {
    const tokenHeader = req.headers.authorization

    // check json web token exists & is verified
    if (tokenHeader) {
        const tokenSplit = tokenHeader.split(' ')
        const token = tokenSplit[1]
        jwt.verify(token, 'secret token', (err, decodedToken) => {
            if (err) {
                jwt.verify(token, 'admin token', (err, decodedToken) => {
                    if (err) {
                        return res.json({code:500, msg: err.message})
                    } else {
                        // console.log(decodedToken);
                        return next();
                    }
                });
            } else {
                // console.log(decodedToken);
                return next();
            }
        });
    } else {
        return res.json({code:500, msg: "vous n'êtes pas connecté"})
    }
};