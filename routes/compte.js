const express = require('express')
const Controller = require('../controllers/compte')
const requireAuth = require('../middlewares/authMiddleware')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()

router.post('/inscription/:num_carte', controller.inscription)
router.post('/connexion', controller.connexion)
router.post('/annuler/:numCarte', requireAuth, controller.annuler)
router.get('/getCompte/:num_carte', requireAuth, controller.getCompte)

module.exports = router